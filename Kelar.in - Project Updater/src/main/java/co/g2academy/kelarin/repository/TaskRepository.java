package co.g2academy.kelarin.repository;

import co.g2academy.kelarin.model.Project;
import co.g2academy.kelarin.model.Task;
import co.g2academy.kelarin.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import static org.springframework.data.redis.serializer.RedisSerializationContext.java;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Ichsan S
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Integer>{
    
    public List<Task> findTaskByProject(Project project);
    public List<Task> findTaskByProjectAndUser(Project project,User user);
}
