package co.g2academy.kelarin.repository;

import co.g2academy.kelarin.model.MessageRoom;
import co.g2academy.kelarin.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Ichsan S
 */
@Repository
public interface MessageRoomRepository extends JpaRepository<MessageRoom, Integer> {
    
    public List<MessageRoom> findMessageRoomByUser1 (User user1);
    public List<MessageRoom> findMessageRoomByUser2 (User user2);
}
