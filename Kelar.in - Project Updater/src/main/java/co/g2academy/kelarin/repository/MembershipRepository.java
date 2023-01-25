package co.g2academy.kelarin.repository;

import co.g2academy.kelarin.model.Membership;
import co.g2academy.kelarin.model.Project;
import co.g2academy.kelarin.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Ichsan S
 */
@Repository
public interface MembershipRepository extends JpaRepository<Membership, Integer> {
    public List<Membership> findMembershipByProject(Project project);
    public List<Membership> findMembershipByUser(User user);
    public Membership findMembershipByUserAndProject(User user, Project project);
}
