package co.g2academy.kelarin.controller;

import co.g2academy.kelarin.repository.MessageRepository;
import co.g2academy.kelarin.repository.MessageRoomRepository;
import co.g2academy.kelarin.repository.UserRepository;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
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
    public ResponseEntity createRoom(Principal principal){
        return ResponseEntity.ok().body("OK");
    }
}
