/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.g2academy.kelarin.service;

import co.g2academy.kelarin.model.User;
import co.g2academy.kelarin.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.connection.SortParameters.Order;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

/**
 *
 * @author Ichsan S
 */
@Service
public class UserMessageListenerService implements MessageListener{
    @Autowired
    @Qualifier("redisPubSubTemplate")
    private RedisTemplate<String,String> redisTemplate;
    @Autowired
    private UserRepository repository;
    private ObjectMapper mapper = new JsonMapper();
    
    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String json = new String (message.getBody());
            User user = mapper.readValue(json, new TypeReference<User>(){});
            repository.save(user);
        } catch (JsonProcessingException ex) {
            ex.printStackTrace();
        }
    }
}
