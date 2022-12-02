package co.g2academy.kelarin.controller;

import co.g2academy.kelarin.model.Comment;
import co.g2academy.kelarin.model.Project;
import co.g2academy.kelarin.model.Task;
import co.g2academy.kelarin.model.TaskLog;
import co.g2academy.kelarin.model.User;
import co.g2academy.kelarin.repository.CommentRepository;
import co.g2academy.kelarin.repository.ProjectRepository;
import co.g2academy.kelarin.repository.TaskLogRepository;
import co.g2academy.kelarin.repository.TaskRepository;
import co.g2academy.kelarin.repository.UserRepository;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.data.redis.serializer.RedisSerializationContext.java;
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
    private TaskLogRepository taskLogRepo;
    
    @PostMapping("/project")
    public ResponseEntity createProject(@RequestBody Project project, Principal principal) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        project.setUser(loggedInUser);
        projectRepo.save(project);
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
                pFromDb.setStartDate(project.getStartDate());
                pFromDb.setDueDate(project.getDueDate());
                pFromDb.setStatus(project.getStatus());
                projectRepo.save(pFromDb);
                return ResponseEntity.ok().body("OK");
            }
        }
        return ResponseEntity.badRequest().body("Project not found");
    }

    @GetMapping("/project")
    public List<Project> getAllProject(Principal principal) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        if (loggedInUser != null) {
            return projectRepo.findAll();
        }
        return null;
    }

    @GetMapping("/api/project/{id}")
    public Project getAllProject(@PathVariable Integer id, Principal principal) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        if (loggedInUser != null) {
            return projectRepo.findById(id).get();
        }
        return null;
    }
    
    @PostMapping("/task")
    public ResponseEntity createTask(@RequestBody Task task, Principal principal) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        task.setUser(loggedInUser);
        taskRepo.save(task);
        TaskLog log = new TaskLog();
        log.setLogType("task");
        log.setTask(task);
        log.setUser(loggedInUser);
        String desc = log.generateDesc("create", log.getLogType(), log.getTask().getStartDate().toString(), log.getUser().getName());
        log.setLogDescription(desc);
        taskLogRepo.save(log);
        return ResponseEntity.ok().body("OK");
    }
    
    @PutMapping("/task")
    public ResponseEntity editTask(@RequestBody Task task, Principal principal){
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        task.setUser(loggedInUser);
        Optional<Task> opt = taskRepo.findById(task.getId());
        if (!opt.isEmpty()) {
            Task tFromDb = opt.get();
            if (tFromDb.getUser().getUsername().equals(principal.getName())) {
                tFromDb.setTaskName(task.getTaskName());
                tFromDb.setStatus(task.getStatus());
                tFromDb.setEndDate(task.getEndDate());                
                taskRepo.save(tFromDb);
                return ResponseEntity.ok().body("OK");
            }
        }
        return ResponseEntity.badRequest().body("Project not found");
    }
    
    @GetMapping("/project/{id}/task")
    public List<Task> getTaskByProject(@PathVariable Integer idProject){
        Project project = projectRepo.findById(idProject).get();
        return taskRepo.findTaskByProject(project);
    }
    
    @PostMapping("/comment")
    public ResponseEntity createComment(@RequestBody Comment comment, Principal principal){
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        comment.setUser(loggedInUser);
        commentRepo.save(comment);
        return ResponseEntity.ok().body("OK");
    }

    @GetMapping("/task/{id-task}/comment")
    public List<Comment> getCommentByTask(@PathVariable Integer idTask){
        Task task = taskRepo.findById(idTask).get();
        return commentRepo.findCommentByTask(task);
    }
    
    @GetMapping("/task/{id-task}/log")
    public List<TaskLog> getTaskLogByTask(@PathVariable Integer idProject){
        Task task = taskRepo.findById(idProject).get();
        return taskLogRepo.findTaskLogByTask(task);
    }
    
    @GetMapping("/project/{id}/task/performance/current-week")
    public Integer getPerformance(@PathVariable Integer id, Principal principal){
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        Project project = projectRepo.findById(id).get();
        List<Task> allTask = taskRepo.findTaskByProjectAndUser(project,loggedInUser);
        return null;
    }
}
