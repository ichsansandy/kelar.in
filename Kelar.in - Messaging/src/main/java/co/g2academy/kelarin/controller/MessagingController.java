package co.g2academy.kelarin.controller;

import co.g2academy.kelarin.model.MessageRoom;
import co.g2academy.kelarin.model.User;
import co.g2academy.kelarin.repository.MessageRepository;
import co.g2academy.kelarin.repository.MessageRoomRepository;
import co.g2academy.kelarin.repository.UserRepository;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.data.redis.serializer.RedisSerializationContext.java;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Ichsan S
 */
@RestController
@RequestMapping("/api")
public class MessagingController {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private MessageRepository messageRepo;
    @Autowired
    private MessageRoomRepository messageRoomRepo;

    @PostMapping("/message-room")
    public ResponseEntity createRoom(@RequestBody User user2, Principal principal) {
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        // get All room list by user1 and user 2
        List<MessageRoom> rooms = messageRoomRepo.findAll();
        // check if the user already created room both in user 1 and 2
        for (MessageRoom room : rooms) {
            if ((room.getUser1().getName().equals(loggedInUser.getName())
                    || room.getUser2().getName().equals(loggedInUser.getName()))
                    && (room.getUser1().getName().equals(user2.getName())
                    || room.getUser2().getName().equals(user2.getName()))) {
                // else found getRoom by id
            } else {
                // if null create the room
                MessageRoom newRoom = new MessageRoom();
                newRoom.setUser1(loggedInUser);
                newRoom.setUser2(user2);
                messageRoomRepo.save(newRoom);
                return ResponseEntity.ok().body("OK");
            }
        }
        return ResponseEntity.badRequest().body("Something wrong with room validation");
    }
    
    @GetMapping("/message-room")
    public List<MessageRoom> getAllRoom(Principal principal){
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        List<MessageRoom> room1 = messageRoomRepo.findMessageRoomByUser1(loggedInUser);
        List<MessageRoom> room2 = messageRoomRepo.findMessageRoomByUser2(loggedInUser);
        List<MessageRoom> rooms = new ArrayList<>();
        rooms.addAll(room1);
        rooms.addAll(room2);
        return rooms;
    }
}
