package co.g2academy.kelarin.controller;

import co.g2academy.kelarin.dto.MemberAndAvailUserDto;
import co.g2academy.kelarin.dto.NewProjectDto;
import co.g2academy.kelarin.dto.NewTaskDto;
import co.g2academy.kelarin.dto.NotificationFirestoreModel;
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
import co.g2academy.kelarin.service.FireNotificationService;
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
import java.util.concurrent.ExecutionException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    private FireNotificationService firestore;

    @PostMapping("/project")
    public ResponseEntity createProject(@RequestBody NewProjectDto inputProject, Principal principal) throws JsonProcessingException, InterruptedException, ExecutionException {
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
                    System.out.println(member);
                    if (member != null) {
                        User addUser = userRepo.findUserByName(member);
                        if (addUser != null) {
                            memberListnew.add(addUser);
                        } else {
                            return ResponseEntity.badRequest().body("user not found");
                        }
                    }
                }
            }
            projectService.createNewProject(project, memberListnew);
            for (User user : memberListnew) {
                NotificationFirestoreModel notif = new NotificationFirestoreModel();
                notif.setCreateDate(new Date());
                notif.setIsRead(false);
                notif.setType("PROJECT");
                notif.setTypeId(project.getId());
                String message = project.getUser().getName() + " just added you as member to " + project.getName();
                notif.setMessage(message);
                firestore.sendNotifToUserFirestore(notif, user.getName());
            }
            return ResponseEntity.ok().body(project);
        }
    }

    @PostMapping("/project/{id}/add-membership")
    public ResponseEntity addAnotherMember(@RequestBody List<String> listNewName, @PathVariable Integer id, Principal principal) throws InterruptedException, ExecutionException {
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
                NotificationFirestoreModel notif = createNotifRelatedToProject(project, "ADD_TO_MEMBER");
                firestore.sendNotifToUserFirestore(notif, user.getName());
            }
        }
        for (User user : membersFromDb) {
            if (!newMemberFromFE.contains(user)) {
                Membership m = membershipRepo.findMembershipByUserAndProject(user, project);
                membershipRepo.delete(m);
                System.out.println("delete");
                NotificationFirestoreModel notif = createNotifRelatedToProject(project, "REMOVE_FROM_MEMBER");
                firestore.sendNotifToUserFirestore(notif, user.getName());
            }
        }
        return ResponseEntity.ok().body("Succesfully assign user to project member");

    }

//    @DeleteMapping("/project/{id}/delete-membership")
//    public ResponseEntity removeMember(@RequestBody List<String> listNewName, @PathVariable Integer id, Principal principal) {
//        Project project = projectRepo.findById(id).get();
//        List<Membership> ms = membershipRepo.findMembershipByProject(project);
//        List<User> membersFromDb = new ArrayList<>();
//        List<User> newMemberFromFE = new ArrayList<>();
//        for (Membership m : ms) {
//            membersFromDb.add(m.getUser());
//        }
//        for (String newName : listNewName) {
//            User addUserFromFE = userRepo.findUserByName(newName);
//            newMemberFromFE.add(addUserFromFE);
//        }
//        for (User user : membersFromDb) {
//            if (!newMemberFromFE.contains(user)) {
//                Membership m = membershipRepo.findMembershipByUserAndProject(user, project);
//                membershipRepo.delete(m);
//                System.out.println("delete");
//            }
//        }
//        return ResponseEntity.ok().body("Succesfully assign user to project member");
//    }
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
    public List<User> getMemberProject(@PathVariable Integer id) {
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

    @GetMapping("/projects")
    public List<Project> getAllProject() {
        return projectRepo.findAll();
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
    public ResponseEntity createTask(@PathVariable Integer id, @RequestBody NewTaskDto taskInput, Principal principal) throws InterruptedException, ExecutionException {
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
            //get all user fo get notification
            List<User> members = getAllMemberInProject(id);
            members.add(p.getUser());
            members.remove(loggedInUser);
            for (User member : members) {
                //make notification and send
                NotificationFirestoreModel notif = createNotifRelatedToProject(task, "ASSIGN_TASK", "");
                firestore.sendNotifToUserFirestore(notif, member.getName());
            }
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
    @GetMapping("/project/{id}/isyourProject")
    public Boolean isYouProject(@PathVariable Integer id, Principal principal) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        Project project = projectRepo.findById(id).get();
        if (loggedInUser.equals(project.getUser())) {
            return true;
        }
        return false;

    }

    @GetMapping("/project/{id}/isalltaskcompleted")
    public Boolean isAllTaskDone(@PathVariable Integer id, Principal principal) {
        Project project = projectRepo.findById(id).get();
        List<Task> tasks = taskRepo.findTaskByProject(project);
        for (Task task : tasks) {
            if (!task.getStatus().equalsIgnoreCase("COMPLETED")) {
                return false;
            }

        }
        return true;
    }

    @PutMapping("/project/{id}/completed")
    public ResponseEntity completeProject(@PathVariable Integer id, Principal principal) throws InterruptedException, ExecutionException {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        Project project = projectRepo.findById(id).get();
        Optional<Project> opt = projectRepo.findById(project.getId());
        if (!opt.isEmpty()) {
            Project pFromDb = opt.get();
            if (pFromDb.getUser().equals(loggedInUser)) {
                pFromDb.setEndDate(new Date());
                pFromDb.setStatus("COMPLETED");
                projectRepo.save(pFromDb);
                //get all user for notification
                List<User> members = getAllMemberInProject(pFromDb.getId());
                members.remove(loggedInUser);
                for (User member : members) {
                    // make notification and send
                    NotificationFirestoreModel notif = createNotifRelatedToProject(pFromDb, "COMPLETED_PROJECT");
                    firestore.sendNotifToUserFirestore(notif, member.getName());
                }
    
                return ResponseEntity.ok().body("Project edited Succesfully");
            }
        }
        return ResponseEntity.badRequest().body("Project not found");
    }

    @PutMapping("/project/{idProject}/task-status/{idTask}/{PAYLOAD}")
    public ResponseEntity editTaskStatus(@PathVariable Integer idProject, @PathVariable Integer idTask, @PathVariable String PAYLOAD, Principal principal) throws InterruptedException, ExecutionException {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        Project project = projectRepo.findById(idProject).get();
        Task tFromDb = taskRepo.findById(idTask).get();
        //get all user fo get notification
        List<User> members = getAllMemberInProject(idProject);
        members.add(project.getUser());
        members.remove(loggedInUser);
        //update task
        if (tFromDb.getAssignUser().equals(loggedInUser) || project.getUser().equals(loggedInUser)) {
            if (tFromDb.getStatus().equals("ASSIGN") && PAYLOAD.equalsIgnoreCase("START")) {
                tFromDb.setStatus("INPROGRESS");
                tFromDb.setStartDate(new Date());
                taskRepo.save(tFromDb);
                for (User member : members) {
                    //make notification and send
                    NotificationFirestoreModel notif = createNotifRelatedToProject(tFromDb, "UPDATE_TASK", PAYLOAD);
                    firestore.sendNotifToUserFirestore(notif, member.getName());
                }
                return ResponseEntity.ok().body("OK");
            } else if (tFromDb.getStatus().equals("INPROGRESS") && PAYLOAD.equalsIgnoreCase("ONHOLD")) {
                tFromDb.setStatus("ONHOLD");
                taskRepo.save(tFromDb);
                for (User member : members) {
                    //make notification and send
                    NotificationFirestoreModel notif = createNotifRelatedToProject(tFromDb, "UPDATE_TASK", PAYLOAD);
                    firestore.sendNotifToUserFirestore(notif, member.getName());
                }
                return ResponseEntity.ok().body("OK");
            } else if (tFromDb.getStatus().equals("ONHOLD") && PAYLOAD.equalsIgnoreCase("INPROGRESS")) {
                tFromDb.setStatus("INPROGRESS");
                taskRepo.save(tFromDb);
                for (User member : members) {
                    //make notification and send
                    NotificationFirestoreModel notif = createNotifRelatedToProject(tFromDb, "UPDATE_TASK", PAYLOAD);
                    firestore.sendNotifToUserFirestore(notif, member.getName());
                }
                return ResponseEntity.ok().body("OK");
            } else if (tFromDb.getStatus().equals("ONHOLD") && PAYLOAD.equalsIgnoreCase("COMPLETED")) {
                tFromDb.setStatus("COMPLETED");
                taskRepo.save(tFromDb);
                for (User member : members) {
                    //make notification and send
                    NotificationFirestoreModel notif = createNotifRelatedToProject(tFromDb, "UPDATE_TASK", PAYLOAD);
                    firestore.sendNotifToUserFirestore(notif, member.getName());
                }
                return ResponseEntity.ok().body("OK");
            } else if (tFromDb.getStatus().equals("INPROGRESS") && PAYLOAD.equalsIgnoreCase("COMPLETED")) {
                tFromDb.setStatus("COMPLETED");
                tFromDb.setEndDate(new Date());
                taskRepo.save(tFromDb);
                for (User member : members) {
                    //make notification and send
                    NotificationFirestoreModel notif = createNotifRelatedToProject(tFromDb, "UPDATE_TASK", PAYLOAD);
                    firestore.sendNotifToUserFirestore(notif, member.getName());
                }
                return ResponseEntity.ok().body("OK");
            }
        }
        return ResponseEntity.badRequest().body("You are not allowed to do this");
    }

    @GetMapping("/project/{id}/task")
    public List<Task> getTaskByProject(@PathVariable Integer id, Principal principal
    ) {
        Project project = projectRepo.findById(id).get();
        return taskRepo.findTaskByProject(project);
    }

    @GetMapping("/project/{id}/isNotHaveTask/{userNameOnly}")
    public Boolean getTaskByProjectAndUser(@PathVariable Integer id, @PathVariable String userNameOnly
    ) {
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
    public ResponseEntity createComment(@PathVariable Integer id, @RequestBody Comment comment, Principal principal
    ) throws InterruptedException, ExecutionException {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        Project project = projectRepo.findById(id).get();
        comment.setUser(loggedInUser);
        comment.setProject(project);
        comment.setCommentDate(new Date());
        commentRepo.save(comment);
        //get all user fo get notification
        List<User> members = getAllMemberInProject(id);
        members.add(project.getUser());
        members.remove(loggedInUser);
        for (User member : members) {
            //make notification and send
            NotificationFirestoreModel notif = createNotifRelatedToProject(project, "POST_COMMENT", comment);
            firestore.sendNotifToUserFirestore(notif, member.getName());
        }
        return ResponseEntity.ok().body(comment);
    }

    @GetMapping("/project/{id}/comment")
    public List<Comment> getCommentByTask(@PathVariable Integer id, Principal principal
    ) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        Project project = projectRepo.findById(id).get();
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

    public List<User> getAllMemberInProject(Integer id) {
        Project project = projectRepo.findById(id).get();
        List<Membership> ms = membershipRepo.findMembershipByProject(project);
        List<User> users = new ArrayList<>();
        for (Membership m : ms) {
            users.add(m.getUser());
        }
        return users;
    }

    public NotificationFirestoreModel createNotifRelatedToProject(Project project, String notifAction) {
        NotificationFirestoreModel notif = new NotificationFirestoreModel();
        notif.setCreateDate(new Date());
        notif.setIsRead(false);
        notif.setType("projects");
        notif.setTypeId(project.getId());
        String message = "";
        switch (notifAction) {
            case "ADD_NEW_PROJECT" -> {
                message = project.getUser().getName() + " just added you as member to Project " + project.getName();
                break;
            }
            case "ADD_TO_MEMBER" -> {
                message = project.getUser().getName() + " just added you as member to Project " + project.getName();
                break;
            }
            case "REMOVE_FROM_MEMBER" -> {
                message = project.getUser().getName() + " just remove you from Project " + project.getName();
                break;
            }
            case "COMPLETED_PROJECT" -> {
                message = "Project " + project.getName() + " has been completed";
                break;
            }
            default ->
                throw new AssertionError();
        }
        notif.setMessage(message);
        return notif;
    }

    public NotificationFirestoreModel createNotifRelatedToProject(Task task, String notifAction, String PAYLOAD) {
        NotificationFirestoreModel notif = new NotificationFirestoreModel();
        notif.setCreateDate(new Date());
        notif.setIsRead(false);
        notif.setType("projects");
        notif.setTypeId(task.getProject().getId());
        String message = "";
        switch (notifAction) {
            case "ASSIGN_TASK" -> {
                message = task.getProject().getUser().getName() + " assign you " + task.getTaskName();
                break;
            }
            case "UPDATE_TASK" -> {
                message = task.getAssignUser().getName() + " just updated " + task.getTaskName() + " to " + PAYLOAD + " status";
                break;
            }
            default ->
                throw new AssertionError();
        }
        notif.setMessage(message);
        return notif;
    }

    public NotificationFirestoreModel createNotifRelatedToProject(Project project, String notifAction, Comment comment) {
        NotificationFirestoreModel notif = new NotificationFirestoreModel();
        notif.setCreateDate(new Date());
        notif.setIsRead(false);
        notif.setType("projects");
        notif.setTypeId(project.getId());
        String message = "";
        switch (notifAction) {
            case "POST_COMMENT" -> {
                message = comment.getUser().getName() + " just post comment in Project " + project.getName();
                break;
            }
            default ->
                throw new AssertionError();
        }
        notif.setMessage(message);
        return notif;
    }
}
