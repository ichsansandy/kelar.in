package co.g2academy.kelarin.controller;

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
                pFromDb.setDescription(project.getDescription());
                pFromDb.setStartDate(project.getStartDate());
                pFromDb.setEndDate(project.getEndDate());
                pFromDb.setStatus(project.getStatus());
                pFromDb.setUser(project.getUser());
                projectRepo.save(pFromDb);
                return ResponseEntity.ok().body("OK");
            }
        }
        return ResponseEntity.badRequest().body("Project not found");
    }

    @GetMapping("/project")
    public List<Project> getAllProject(@RequestBody Principal principal) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        if (loggedInUser != null) {
            return projectRepo.findAll();
        }
        return null;
    }

    @GetMapping("/api/project/{id}")
    public Project getAllProject(@PathVariable Integer id, @RequestBody Principal principal) {
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
                tFromDb.setStatus(task.getStatus());
                tFromDb.setUser(task.getUser());
                taskRepo.save(tFromDb);
                return ResponseEntity.ok().body("OK");
            }
        }
        return ResponseEntity.badRequest().body("Project not found");
    }
            

}
