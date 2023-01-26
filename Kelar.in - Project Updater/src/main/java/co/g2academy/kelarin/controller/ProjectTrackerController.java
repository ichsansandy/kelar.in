package co.g2academy.kelarin.controller;

import co.g2academy.kelarin.dto.MemberAndAvailUserDto;
import co.g2academy.kelarin.dto.NewProjectDto;
import co.g2academy.kelarin.dto.NewTaskDto;
import co.g2academy.kelarin.model.Comment;
import co.g2academy.kelarin.model.Membership;
import co.g2academy.kelarin.model.Project;
import co.g2academy.kelarin.model.Task;
import co.g2academy.kelarin.model.User;
import co.g2academy.kelarin.repository.CommentRepository;
import co.g2academy.kelarin.repository.MembershipRepository;
import co.g2academy.kelarin.repository.ProjectRepository;
import co.g2academy.kelarin.repository.TaskRepository;
import co.g2academy.kelarin.repository.UserRepository;
import co.g2academy.kelarin.service.CreateNewProjectService;
import co.g2academy.kelarin.service.MessagePublisherService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import java.io.IOException;
import java.security.Principal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.data.redis.serializer.RedisSerializationContext.java;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Ichsan S
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ProjectTrackerController {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private ProjectRepository projectRepo;
    @Autowired
    private TaskRepository taskRepo;
    @Autowired
    private CommentRepository commentRepo;
    @Autowired
    private MembershipRepository membershipRepo;
    @Autowired
    private MessagePublisherService messagePublisherService;
    private ObjectMapper mapper = new JsonMapper();

    @Autowired
    private CreateNewProjectService projectService;

    @PostMapping("/project")
    public ResponseEntity createProject(@RequestBody NewProjectDto inputProject, Principal principal) throws JsonProcessingException {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        Project pfromDb = projectRepo.findProjectByNameAndUser(inputProject.getName(), loggedInUser);
        if (pfromDb != null) {
            return ResponseEntity.badRequest().body("Project name already exist");
        } else {
            Project project = new Project();
            project.setName(inputProject.getName());
            project.setUser(loggedInUser);
            project.setStartDate(inputProject.getStartDate());
            project.setDueDate(inputProject.getDueDate());
            project.setStatus("INPROGRESS");
            //projectRepo.save(project);
            //generateLogAndSendToNotification("create new ", "project", loggedInUser);
            //check duplicate
            List<String> usersNameOnly = inputProject.getMembers();
            Set<String> setUsersNameOnly = new HashSet<>(usersNameOnly);
            List<User> memberListnew = new ArrayList<>();
            if (setUsersNameOnly.size() < usersNameOnly.size()) {
                return ResponseEntity.badRequest().body("user duplicate already inside membership");
            } else {
                for (String member : inputProject.getMembers()) {
                    User addUser = userRepo.findUserByName(member);
                    if (addUser == null) {
                        return ResponseEntity.badRequest().body("user not found");
                    } else {

                    }
                }
            }
            String result = projectService.createNewProject(project, memberListnew);
            if (result == "OK") {
                return ResponseEntity.ok().body(project);
            }
            return ResponseEntity.badRequest().body("Something Wrong");
        }
    }

    @PostMapping("/project/{id}/membership")
    public ResponseEntity addNewMember(@RequestBody NewProjectDto inputProject, @PathVariable Integer id, Principal principal) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        Project project = projectRepo.findById(id).get();
        if (project.getUser().equals(loggedInUser)) {
            for (String member : inputProject.getMembers()) {
                User addUser = userRepo.findUserByName(member);
                Membership m = new Membership();
                m.setProject(project);
                m.setUser(addUser);
                membershipRepo.save(m);
            }
            return ResponseEntity.ok().body("Succesfully assign user to project member");
        }
        return ResponseEntity.badRequest().body("You're not the owner");
    }

    @PostMapping("/project/{id}/add-membership")
    public ResponseEntity addAnotherMember(@RequestBody List<String> listNewName, @PathVariable Integer id, Principal principal) {
        Project project = projectRepo.findById(id).get();
        List<Membership> ms = membershipRepo.findMembershipByProject(project);
        List<User> membersFromDb = new ArrayList<>();
        List<User> newMemberFromFE = new ArrayList<>();
        for (Membership m : ms) {
            membersFromDb.add(m.getUser());
        }
        for (String newName : listNewName) {
            User addUserFromFE = userRepo.findUserByName(newName);
            newMemberFromFE.add(addUserFromFE);
        }
        for (User user : newMemberFromFE) {
            if (!membersFromDb.contains(user)) {
                Membership m = new Membership();
                m.setProject(project);
                m.setUser(user);
                membershipRepo.save(m);
            }
        }
        for (User user : membersFromDb) {
            if (!newMemberFromFE.contains(user)) {
                Membership m = membershipRepo.findMembershipByUserAndProject(user, project);
                membershipRepo.delete(m);
                System.out.println("delete");
            }
        }
        return ResponseEntity.ok().body("Succesfully assign user to project member");

    }

    @DeleteMapping("/project/{id}/delete-membership")
    public ResponseEntity removeMember(@RequestBody List<String> listNewName, @PathVariable Integer id, Principal principal) {
        Project project = projectRepo.findById(id).get();
        List<Membership> ms = membershipRepo.findMembershipByProject(project);
        List<User> membersFromDb = new ArrayList<>();
        List<User> newMemberFromFE = new ArrayList<>();
        for (Membership m : ms) {
            membersFromDb.add(m.getUser());
        }
        for (String newName : listNewName) {
            User addUserFromFE = userRepo.findUserByName(newName);
            newMemberFromFE.add(addUserFromFE);
        }
        for (User user : membersFromDb) {
            if (!newMemberFromFE.contains(user)) {
                Membership m = membershipRepo.findMembershipByUserAndProject(user, project);
                membershipRepo.delete(m);
                System.out.println("delete");
            }
        }
        return ResponseEntity.ok().body("Succesfully assign user to project member");
    }

    @PutMapping("/project/{id}")
    public ResponseEntity editPorject(@RequestBody Project project, Principal principal) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        project.setUser(loggedInUser);
        Optional<Project> opt = projectRepo.findById(project.getId());
        if (!opt.isEmpty()) {
            Project pFromDb = opt.get();
            if (pFromDb.getUser().getUsername().equals(principal.getName())) {
                pFromDb.setName(project.getName());
                pFromDb.setDueDate(project.getDueDate());
                pFromDb.setStatus(project.getStatus());
                projectRepo.save(pFromDb);
                return ResponseEntity.ok().body("Project edited Succesfully");
            }
        }
        return ResponseEntity.badRequest().body("Project not found");
    }

    @PutMapping("/project/{id}/edit-picture")
    public ResponseEntity editProjectImage(@RequestParam("image") MultipartFile file, Principal principal, Integer id) {
        User LoggedInUserFromDb = userRepo.findUserByUsername(principal.getName());
        Optional<Project> opt = projectRepo.findById(id);
        if (!opt.isEmpty()) {
            Project pFromDb = opt.get();
            if (pFromDb.getUser().getUsername().equals(principal.getName())) {
                try {
                    pFromDb.setProjectLogoImage(file.getBytes());
                } catch (IOException ex) {
                    Logger.getLogger(ProjectTrackerController.class.getName()).log(Level.SEVERE, null, ex);
                }
                projectRepo.save(pFromDb);
                return ResponseEntity.ok().body("Project Image Uploaded");
            }
        }
        return ResponseEntity.badRequest().body("Project not found");
    }

    @GetMapping("/project/{id}/membership")
    public List<User> getMemberProject(@PathVariable Integer id, Principal principal) {
        Project project = projectRepo.findById(id).get();
        List<Membership> ms = membershipRepo.findMembershipByProject(project);
        List<User> users = new ArrayList<>();
        for (Membership m : ms) {
            users.add(m.getUser());
        }
        return users;
    }

    @GetMapping("/project/{id}/membership-availuser")
    public MemberAndAvailUserDto getMemberOnlyNameProject(@PathVariable Integer id, Principal principal) {
        Project project = projectRepo.findById(id).get();
        List<Membership> ms = membershipRepo.findMembershipByProject(project);
        MemberAndAvailUserDto memberAndAvailUser = new MemberAndAvailUserDto();
        List<String> members = new ArrayList<>();
        List<String> availUsers = new ArrayList<>();
        for (Membership m : ms) {
            members.add(m.getUser().getName());
        }
        List<User> allUser = userRepo.findAll();
        for (User user : allUser) {
            availUsers.add(user.getName());
        }
        availUsers.removeAll(members);
        availUsers.remove(project.getUser().getName());
        memberAndAvailUser.setMembership(members);
        memberAndAvailUser.setAvailUser(availUsers);
        return memberAndAvailUser;
    }

    @GetMapping("/project/{id}")
    public Project getProjectDetails(@PathVariable Integer id) {
        return projectRepo.findById(id).get();
    }

    @GetMapping("/project/created-by-you")
    public List<Project> getAllYourProject(Principal principal) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        if (loggedInUser != null) {
            return projectRepo.findProjectByUser(loggedInUser);
        }
        return null;
    }

    @GetMapping("/project/assign-to-you")
    public List<Project> getAllOtherProject(Principal principal) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        List<Membership> ms = membershipRepo.findMembershipByUser(loggedInUser);
        List<Project> p = new ArrayList<>();
        for (Membership m : ms) {
            p.add(projectRepo.findById(m.getProject().getId()).get());
        }
        return p;
    }

    @PostMapping("/project/{id}/task")
    public ResponseEntity createTask(@PathVariable Integer id, @RequestBody NewTaskDto taskInput, Principal principal) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        Project p = projectRepo.findById(id).get();
        User userAssign = userRepo.findUserByName(taskInput.getUser());
        Boolean validation = validateUserOrMembership(p, userAssign);
        if (validation == true) {
            Task task = new Task();
            task.setProject(p);
            task.setDueDate(taskInput.getDueDate());
            task.setAssignUser(userAssign);
            task.setTaskName(taskInput.getTaskName());
            task.setStatus("ASSIGN");
            taskRepo.save(task);
            return ResponseEntity.ok().body(task);
        }
        return ResponseEntity.badRequest().body("You are not the project owner or the user not in member");
    }

//    @PutMapping("/project/{id}/task")
//    public ResponseEntity editTaskName(@PathVariable Integer idProject, @RequestBody Task task, Principal principal) {
//        User loggedInUser = userRepo.findUserByUsername(principal.getName());
//        Project project = projectRepo.findById(idProject).get();
//        if (task.getAssignUser().equals(loggedInUser) || loggedInUser.equals(project.getUser())) {
//            Optional<Task> opt = taskRepo.findById(task.getId());
//            if (!opt.isEmpty()) {
//                Task tFromDb = opt.get();
//                if (tFromDb.getUser().getUsername().equals(principal.getName())) {
//                    tFromDb.setTaskName(task.getTaskName());
//                    taskRepo.save(tFromDb);
//                    return ResponseEntity.ok().body("OK");
//                }
//            }
//        }
//        return ResponseEntity.badRequest().body("You are not allowed to do this");
//    }
    @PutMapping("/project/{id}/task-status")
    public ResponseEntity editTaskStatus(@PathVariable Integer idProject, @RequestBody Task task, Principal principal) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        Project project = projectRepo.findById(idProject).get();
        if (task.getAssignUser().equals(loggedInUser) || loggedInUser.equals(project.getUser())) {
            Optional<Task> opt = taskRepo.findById(task.getId());
            if (!opt.isEmpty()) {
                Task tFromDb = opt.get();
                if (tFromDb.getAssignUser().getUsername().equals(principal.getName())) {
                    if (task.getStatus().equals("ASSIGN")) {
                        tFromDb.setStatus("INPROGRESS");
                        task.setStartDate(new Date());
                        taskRepo.save(tFromDb);
                        return ResponseEntity.ok().body("OK");
                    }
                    if (task.getStatus().equals("COMPLETED")) {
                        tFromDb.setStatus(task.getStatus());
                        tFromDb.setEndDate(new Date());
                        taskRepo.save(tFromDb);
                        return ResponseEntity.ok().body("OK");
                    }
                }
            }
        }
        return ResponseEntity.badRequest().body("You are not allowed to do this");
    }

    @GetMapping("/project/{id}/task")
    public List<Task> getTaskByProject(@PathVariable Integer id, Principal principal) {
        Project project = projectRepo.findById(id).get();
        return taskRepo.findTaskByProject(project);
    }

    @GetMapping("/project/{id}/isNotHaveTask/{userNameOnly}")
    public Boolean getTaskByProjectAndUser(@PathVariable Integer id, @PathVariable String userNameOnly) {
        Project project = projectRepo.findById(id).get();
            User user = userRepo.findUserByName(userNameOnly);
            System.out.println(user.getName());
            List<Task> tasks = taskRepo.findTaskByProject(project);
            for (Task task : tasks) {
                if (task.getAssignUser().equals(user)) {
                    return false;
                }
            }
        return true;

    }

    @PostMapping("/project/{id}/comment")
    public ResponseEntity createComment(@PathVariable Integer idProject, @RequestBody Comment comment, Principal principal
    ) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        Project project = projectRepo.findById(idProject).get();
        comment.setUser(loggedInUser);
        comment.setProject(project);
        comment.setCommentDate(new Date());
        commentRepo.save(comment);
        return ResponseEntity.ok().body("OK");
    }

    @GetMapping("/project/{id}/comment")
    public List<Comment> getCommentByTask(@PathVariable Integer idProject, Principal principal
    ) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        Project project = projectRepo.findById(idProject).get();
        //Boolean validation = validateUserOwnerOrMembership(project, loggedInUser);
        //if (validation == true) {
        return commentRepo.findCommentByProject(project);
        //}
        //return null;
    }

    @GetMapping("/project/{id}/task/performance/last-month")
    public Integer getPerformanceLastMonth(@PathVariable Integer id, Principal principal
    ) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());

        LocalDate lastMonth = LocalDate.now().minusDays(30);
        Date lastMonthAgo = new Date(lastMonth.toEpochDay());

        //query task by due date between current date - 7
        List<Task> LastMonthTasks = taskRepo.findTaskByEndDateBetween(new Date(), lastMonthAgo);

        Integer performance = performanceCalc(LastMonthTasks);
        return performance;
    }

    @GetMapping("/project/{id}/task/performance/last-week")
    public Integer getPerformanceLastWeek(@PathVariable Integer id, Principal principal
    ) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());

        LocalDate sevendaysago = LocalDate.now().minusDays(7);
        Date sevenDays = new Date(sevendaysago.toEpochDay());

        LocalDate fourteenDaysAgo = LocalDate.now().minusDays(14);
        Date fourteenDays = new Date(fourteenDaysAgo.toEpochDay());
        //query task by due date between current date - 7
        List<Task> LastWeekTasks = taskRepo.findTaskByEndDateBetween(sevenDays, fourteenDays);

        Integer performance = performanceCalc(LastWeekTasks);
        return performance;
    }

    @GetMapping("/project/{id}/task/performance/current-week")
    public Integer getPerformanceCurrentWeek(@PathVariable Integer id, Principal principal
    ) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());

        LocalDate sevendaysago = LocalDate.now().minusDays(7);
        Date sevenDays = new Date(sevendaysago.toEpochDay());

        //query task by due date between current date - 7
        List<Task> CurrentWeekAgoTasks = taskRepo.findTaskByEndDateBetween(new Date(), sevenDays);

        Integer performance = performanceCalc(CurrentWeekAgoTasks);
        return performance;
    }

    public Integer performanceCalc(List<Task> tasks) {
        List<Integer> points = new ArrayList<>();

        for (Task task : tasks) {
            if (task.getEndDate().before(task.getDueDate())) {
                points.add(100);
            } else if (task.getEndDate().after(task.getDueDate())) {
                points.add(75);
            }
        }
        Integer sum = points.stream().mapToInt(Integer::intValue).sum();
        Integer total = tasks.size();
        Integer performance = sum / total;
        return performance;
    }

    public void generateLogAndSendToNotification(String action, String type, User loggedInUser) throws JsonProcessingException {
//        TaskLog log = new TaskLog();
//        log.setLogType(type);
//        log.setUser(loggedInUser);
//        String desc = log.generateDesc(log.getUser().getName(), action, log.getLogType(), String.valueOf(new Date()));
//        log.setLogDescription(desc);
//        String json = mapper.writeValueAsString(log);
//        messagePublisherService.publishTaskLog(json);
    }

    public Boolean validateUserOrMembership(Project project, User user) {
        Membership ms = membershipRepo.findMembershipByUserAndProject(user, project);
        if (ms != null) {
            if (ms.getUser().equals(user)) {
                return true;
            }
        }
        return false;
    }
}
