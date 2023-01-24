package co.g2academy.kelarin.service;

import co.g2academy.kelarin.model.Membership;
import co.g2academy.kelarin.model.Project;
import co.g2academy.kelarin.model.User;
import co.g2academy.kelarin.repository.MembershipRepository;
import co.g2academy.kelarin.repository.ProjectRepository;
import co.g2academy.kelarin.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.data.redis.serializer.RedisSerializationContext.java;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Ichsan S
 */
@Service
public class CreateNewProjectService {

    @Autowired
    private MembershipRepository membershipRepo;

    @Autowired
    private ProjectRepository projectRepository;

    @Transactional(readOnly = false)
    public String createNewProject(Project project, List<User> memberList) {
        projectRepository.save(project);
        for (User user : memberList) {
            Membership m = new Membership();
            m.setProject(project);
            m.setUser(user);
            membershipRepo.save(m);
        }
        return "OK";
    }
}
