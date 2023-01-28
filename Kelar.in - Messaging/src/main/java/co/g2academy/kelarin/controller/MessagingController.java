package co.g2academy.kelarin.controller;

import co.g2academy.kelarin.model.Message;
import co.g2academy.kelarin.model.MessageRoom;
import co.g2academy.kelarin.model.User;
import co.g2academy.kelarin.repository.MessageRepository;
import co.g2academy.kelarin.repository.MessageRoomRepository;
import co.g2academy.kelarin.repository.UserRepository;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.data.redis.serializer.RedisSerializationContext.java;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @PostMapping("/{loggedIn}/message-room/{selectUser}")
    public ResponseEntity createRoom(@PathVariable String selectUser, @PathVariable String loggedIn) {
        User loggedInUser = userRepo.findUserByName(loggedIn);
        // get All room list by user1 and user2
        List<MessageRoom> rooms = messageRoomRepo.findAll();
        // check if the user already created room both in user 1 and 2
        if (rooms.isEmpty()) {
            User secondUser = userRepo.findUserByName(selectUser);
            MessageRoom newRoom = new MessageRoom();
            newRoom.setUser1(loggedInUser);
            newRoom.setUser2(secondUser);
            messageRoomRepo.save(newRoom);
            return ResponseEntity.ok().body(newRoom);
        }
        for (MessageRoom room : rooms) {
            if ((room.getUser1().getName().equals(loggedInUser.getName())
                    || room.getUser2().getName().equals(loggedInUser.getName()))
                    && (room.getUser1().getName().equalsIgnoreCase(selectUser)
                    || room.getUser2().getName().equalsIgnoreCase(selectUser))) {
                // getRoom by id
                return ResponseEntity.badRequest().body("room already created");
            } else {
                // if null create the room
                User secondUser = userRepo.findUserByName(selectUser);
                MessageRoom newRoom = new MessageRoom();
                newRoom.setUser1(loggedInUser);
                newRoom.setUser2(secondUser);
                messageRoomRepo.save(newRoom);
                return ResponseEntity.ok().body(newRoom);
            }
        }
        return ResponseEntity.badRequest().body("Something wrong with room validation");
    }

    @GetMapping("/{loggedIn}/message-room")
    public List<MessageRoom> getAllRoom(@PathVariable String loggedIn) {
        User loggedInUser = userRepo.findUserByName(loggedIn);
        List<MessageRoom> room1 = messageRoomRepo.findMessageRoomByUser1(loggedInUser);
        List<MessageRoom> room2 = messageRoomRepo.findMessageRoomByUser2(loggedInUser);
        List<MessageRoom> rooms = new ArrayList<>();
        rooms.addAll(room1);
        rooms.addAll(room2);
        return rooms;
    }

    @GetMapping("/message-room/{idRoom}")
    public List<Message> getMessageByMessageRoom(@PathVariable Integer idRoom) {
        List<Message> messages = messageRepo.findMessageByMessageRoom(messageRoomRepo.findById(idRoom).get());
        return messages;
    }

    @PostMapping("/{loggedIn}/message-room/{idRoom}/message")
    public ResponseEntity createMessage(@PathVariable Integer idRoom, @PathVariable String loggedIn, @RequestBody Message inputMessage) {
        User loggedInUser = userRepo.findUserByName(loggedIn);
        MessageRoom room = messageRoomRepo.findById(idRoom).get();
        if ((room.getUser1().getName().equals(loggedInUser.getName())
                || room.getUser2().getName().equals(loggedInUser.getName()))) {
            Message message = new Message();
            message.setMessageRoom(room);
            message.setSender(loggedInUser);
            message.setMessage(inputMessage.getMessage());
            message.setCreateDate(new Date());
            messageRepo.save(message);
            return ResponseEntity.ok().body(message);
        }
        return ResponseEntity.badRequest().body("You are not allowed to do this");
    }

}
