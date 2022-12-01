package co.g2academy.kelarin.security.service;

import co.g2academy.kelarin.model.User;
import co.g2academy.kelarin.repository.UserRepository;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.data.redis.serializer.RedisSerializationContext.java;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

/**
 *
 * @author Ichsan S
 */
@Component
public class JwtUserDetailService implements UserDetailsService {
    @Autowired
    private UserRepository repository;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repository.findUserByUsername(username);
        if (user != null){
            org.springframework.security.core.userdetails.User userDetails = new org.springframework.security.core.userdetails.User(username, user.getPassword(), new ArrayList<>());
            return userDetails;
        }
        throw new UsernameNotFoundException("User Not Found");
    }
    
}
