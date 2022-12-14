package co.g2academy.kelarin.controller;

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
import co.g2academy.kelarin.service.MessagePublisherService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import java.security.Principal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.data.redis.serializer.RedisSerializationContext.java;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Ichsan S
 */
@RestController
@RequestMapping("/api")
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

    @PostMapping("/project")
    public ResponseEntity createProject(@RequestBody Project project, Principal principal) throws JsonProcessingException {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        project.setUser(loggedInUser);
        project.setStartDate(new Date());
        projectRepo.save(project);
        generateLogAndSendToNotification("create new ", "project", loggedInUser);
        return ResponseEntity.ok().body("OK");
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
                return ResponseEntity.ok().body("OK");
            }
        }
        return ResponseEntity.badRequest().body("Project not found");
    }

    @PostMapping("/project/{id}/membership")
    public ResponseEntity addNewMember(@RequestBody User addUser, @PathVariable Integer idProject, Principal principal) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        Project project = projectRepo.findById(idProject).get();
        if (project.getUser().equals(loggedInUser)) {
            Membership m = new Membership();
            m.setProject(project);
            m.setUser(addUser);
            membershipRepo.save(m);
        }
        return ResponseEntity.ok().body("OK");
    }

    @GetMapping("/project/{id}/membership")
    public List<User> getMemberProject(@PathVariable Integer idProject, Principal principal) {
        Project project = projectRepo.findById(idProject).get();
        List<Membership> ms = membershipRepo.findMembershipByProject(project);
        List<User> users = new ArrayList<>();
        for (Membership m : ms) {
            users.add(m.getUser());
        }
        return users;
    }

    @GetMapping("/project/cerated-by-you")
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
    public ResponseEntity createTask(@PathVariable Integer idProject, @RequestBody Task task, @RequestBody User user, Principal principal) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        Project p = projectRepo.findById(idProject).get();
        if (loggedInUser.equals(p.getUser())) {
            task.setUser(loggedInUser);
            task.setProject(p);
            task.setAssignUser(user);
            task.setStatus("ASSIGN");
            taskRepo.save(task);
            return ResponseEntity.ok().body("OK");
        }
        return ResponseEntity.badRequest().body("You are not the project owner");
    }

    @PutMapping("/project/{id}/task")
    public ResponseEntity editTaskName(@PathVariable Integer idProject, @RequestBody Task task, Principal principal) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        Project project = projectRepo.findById(idProject).get();
        if (task.getAssignUser().equals(loggedInUser) || loggedInUser.equals(project.getUser())) {
            Optional<Task> opt = taskRepo.findById(task.getId());
            if (!opt.isEmpty()) {
                Task tFromDb = opt.get();
                if (tFromDb.getUser().getUsername().equals(principal.getName())) {
                    tFromDb.setTaskName(task.getTaskName());
                    taskRepo.save(tFromDb);
                    return ResponseEntity.ok().body("OK");
                }
            }
        }
        return ResponseEntity.badRequest().body("You are not allowed to do this");
    }

    @PutMapping("/project/{id}/task")
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
    public List<Task> getTaskByProject(@PathVariable Integer idProject, Principal principal) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        Project project = projectRepo.findById(idProject).get();
        List<Membership> ms = project.getMemberships();
        for (Membership m : ms) {
            if (m.getUser().equals(loggedInUser)) {
                return taskRepo.findTaskByProject(project);
            }
        }
        if (project.getUser().equals(loggedInUser)) {
            return taskRepo.findTaskByProject(project);
        }
        return null;
    }

    @PostMapping("/project/{id}/comment")
    public ResponseEntity createComment(@PathVariable Integer idProject, @RequestBody Comment comment, Principal principal) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        Project project = projectRepo.findById(idProject).get();
        Boolean validation = validateUserOwnerOrMembership(project, loggedInUser);
        if (validation == true) {
            comment.setUser(loggedInUser);
            comment.setProject(project);
            comment.setCommentDate(new Date());
            commentRepo.save(comment);
            return ResponseEntity.ok().body("OK");
        }
        return ResponseEntity.badRequest().body("OK");
    }

    @GetMapping("/project/{id}/comment")
    public List<Comment> getCommentByTask(@PathVariable Integer idProject, Principal principal) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        Project project = projectRepo.findById(idProject).get();
        Boolean validation = validateUserOwnerOrMembership(project, loggedInUser);
        if (validation == true) {
            return commentRepo.findCommentByProject(project);
        }
        return null;
    }

    @GetMapping("/project/{id}/task/performance/last-month")
    public Integer getPerformanceLastMonth(@PathVariable Integer id, Principal principal) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());

        LocalDate lastMonth = LocalDate.now().minusDays(30);
        Date lastMonthAgo = new Date(lastMonth.toEpochDay());

        //query task by due date between current date - 7
        List<Task> LastMonthTasks = taskRepo.findTaskByEndDateBetween(new Date(), lastMonthAgo);

        Integer performance = performanceCalc(LastMonthTasks);
        return performance;
    }

    @GetMapping("/project/{id}/task/performance/last-week")
    public Integer getPerformanceLastWeek(@PathVariable Integer id, Principal principal) {
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
    public Integer getPerformanceCurrentWeek(@PathVariable Integer id, Principal principal) {
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

    public Boolean validateUserOwnerOrMembership(Project project, User user) {
        List<Membership> ms = project.getMemberships();
        for (Membership m : ms) {
            if (m.getUser().equals(user)) {
                return true;
            }
        }
        if (project.getUser().equals(user)) {
            return true;
        }
        return false;
    }
}
