package co.g2academy.kelarin.controller;

import co.g2academy.kelarin.model.User;
import co.g2academy.kelarin.repository.MessageRepository;
import co.g2academy.kelarin.repository.MessageRoomRepository;
import co.g2academy.kelarin.repository.UserRepository;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.data.redis.serializer.RedisSerializationContext.java;
import org.springframework.http.ResponseEntity;
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
    private MessageRoomRepository roomRepo;
    
    
    @PostMapping("/message-room")
    public ResponseEntity createRoom(@RequestBody User user2,Principal principal){
        User loggedInUser = userRepo.findUserByUsername(principal.getName());
        // get All room list by user1 and user 2
        
        // check if the user already created room both in user 1 and 2
        // if null create the room
        // else found getRoom by id
        return ResponseEntity.ok().body("OK");
    }
}
