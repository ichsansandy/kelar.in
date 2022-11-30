package co.g2academy.kelarin.repository;

import co.g2academy.kelarin.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Ichsan S
 */
@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer>{

}
