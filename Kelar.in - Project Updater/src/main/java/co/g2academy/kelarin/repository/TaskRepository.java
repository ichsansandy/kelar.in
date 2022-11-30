package co.g2academy.kelarin.repository;

import co.g2academy.kelarin.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Ichsan S
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Integer>{

}
