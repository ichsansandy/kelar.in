package co.g2academy.kelarin.repository;

import co.g2academy.kelarin.model.Comment;
import co.g2academy.kelarin.model.Project;
import co.g2academy.kelarin.model.Task;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import static org.springframework.data.redis.serializer.RedisSerializationContext.java;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Ichsan S
 */
@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer>{
    
    public List<Comment> findCommentByProject(Project project);

}
