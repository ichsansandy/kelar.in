package co.g2academy.kelarin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

/**
 *
 * @author Ichsan S
 */
@Component
public class MessagePublisherService {
    @Autowired
    @Qualifier("redisPubSubTemplate")
    private RedisTemplate<String , String> template;
    
    public void publishRegister(String message){
        template.convertAndSend("userCreationPubSub", message);
    }
}
