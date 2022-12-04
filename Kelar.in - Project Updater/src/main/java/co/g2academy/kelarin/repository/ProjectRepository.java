package co.g2academy.kelarin.repository;

import co.g2academy.kelarin.model.Project;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Ichsan S
 */
@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer>{
    
    public List<Project> findProjectByUser(User user);
}
