package co.g2academy.kelarin.controller;

import co.g2academy.kelarin.model.User;
import co.g2academy.kelarin.repository.UserRepository;
import co.g2academy.kelarin.validator.UserPassRegex1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
public class UserController {

    @Autowired
    private UserRepository repository;
    @Autowired
    private UserPassRegex1 validator;
    private PasswordEncoder encoder = new BCryptPasswordEncoder();
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody User user) {
        User userFromDb = repository.findUserByUsername(user.getUsername());
        if (userFromDb == null
                && validator.emailValidator(user.getUsername())
                && validator.passwordValidator(user.getPassword())) {
            //publish user to kelarin_messaging
            //publish user to kelarin_push_notification
            user.setPassword(encoder.encode(user.getPassword()));
            repository.save(user);
        } else {
            return ResponseEntity.badRequest().body("user exist, email or password invalid");
        }
        return ResponseEntity.ok().body("OK");
    }
    
}
