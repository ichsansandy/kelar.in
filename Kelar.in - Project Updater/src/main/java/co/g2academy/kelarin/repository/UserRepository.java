package co.g2academy.kelarin.repository;

import co.g2academy.kelarin.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Ichsan S
 */
@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
    
    public User findUserByUsername(String username);
    public User findUserByName(String name);
}
