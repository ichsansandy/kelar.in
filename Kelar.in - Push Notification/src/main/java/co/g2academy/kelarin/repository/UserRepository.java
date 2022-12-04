package co.g2academy.kelarin.repository;

import co.g2academy.kelarin.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Ichsan S
 */
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    
}
