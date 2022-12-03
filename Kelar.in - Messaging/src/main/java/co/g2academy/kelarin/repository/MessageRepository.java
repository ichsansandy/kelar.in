package co.g2academy.kelarin.repository;

import co.g2academy.kelarin.model.Message;
import co.g2academy.kelarin.model.MessageRoom;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Ichsan S
 */
@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
    
    public List<Message> findMessageByMessageRoom (MessageRoom messageRoom);
}
