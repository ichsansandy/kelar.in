package co.g2academy.kelarin.controller;

import co.g2academy.kelarin.dto.UserDto;
import co.g2academy.kelarin.model.User;
import co.g2academy.kelarin.repository.UserRepository;
import co.g2academy.kelarin.service.MessagePublisherService;
import co.g2academy.kelarin.validator.UserPassRegex1;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Ichsan S
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository repository;
//    @Autowired
//    private UserPassRegex1 validator;
    @Autowired
    private MessagePublisherService messagePublisherService;
    private ObjectMapper mapper = new JsonMapper();
    private PasswordEncoder encoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody User user) throws JsonProcessingException {
        System.out.println(user.getName());
        System.out.println(user.getUsername());
        System.out.println(user.getPassword());
        User userFromDbByUsername = repository.findUserByUsername(user.getUsername());
        User userFromDbByName = repository.findUserByName(user.getName());
        if (userFromDbByUsername == null
                && userFromDbByName == null 
                // && validator.emailValidator(user.getUsername())
                // && validator.passwordValidator(user.getPassword())
                ) {
            user.setPassword(encoder.encode(user.getPassword()));
            repository.save(user);
            //user dto
            UserDto dto = new UserDto(user);
            String json = mapper.writeValueAsString(dto);
            //publish user to chaneel userCreation for kelarin_messaging kelarin_push_notification
//            messagePublisherService.publishRegister(json);
        } else {
            return ResponseEntity.badRequest().body("user exist, email or password invalid");
        }
        return ResponseEntity.ok().body("OK");
    }

    @PutMapping("/profile/{id}/edit-name-save")
    public ResponseEntity edit(@RequestBody User user, Principal principal) throws JsonProcessingException {
        User loggedInUserFromDb = repository.findUserByUsername(principal.getName());
        loggedInUserFromDb.setName(user.getName());
        repository.save(loggedInUserFromDb);
        //user dto
        UserDto dto = new UserDto(loggedInUserFromDb);
        String json = mapper.writeValueAsString(dto);
        //publish user to chaneel userCreation for kelarin_messaging kelarin_push_notification
        messagePublisherService.publishEditUser(json);
        return ResponseEntity.ok().body("OK");
    }

}
