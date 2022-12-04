package co.g2academy.kelarin.config;

import co.g2academy.kelarin.service.PushNotificationMessageListenerService;
import co.g2academy.kelarin.service.UserMessageListenerService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.serializer.GenericToStringSerializer;

/**
 *
 * @author Ichsan S
 */
@Configuration
public class RedisConfig {
    @Bean
    public JedisConnectionFactory jedisConnectionFactory(){
        return new JedisConnectionFactory();
    }
    
    @Bean(name="redisPubSubTemplate")
    public RedisTemplate<String,String> redisTemplate(){
        RedisTemplate<String,String> template =new RedisTemplate<>();
        template.setConnectionFactory(jedisConnectionFactory());
        template.setValueSerializer(new GenericToStringSerializer<>(String.class));
        return template;
    }
    
    @Bean
    public MessageListenerAdapter userMessageListener(UserMessageListenerService service){
        return new MessageListenerAdapter(service);
    }
    
    @Bean 
    public RedisMessageListenerContainer userMessageContainer(MessageListenerAdapter adapter){
        ChannelTopic topic = new ChannelTopic("userCreationPubSub");
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(jedisConnectionFactory());
        container.addMessageListener(adapter, topic);
        return container;
    }
    @Bean
    public MessageListenerAdapter pushNotificationMessageListener(PushNotificationMessageListenerService service){
        return new MessageListenerAdapter(service);
    }
    
    @Bean 
    public RedisMessageListenerContainer pushNotificationMessageContainer(MessageListenerAdapter adapter){
        ChannelTopic topic = new ChannelTopic("pushNotificationPubSub");
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(jedisConnectionFactory());
        container.addMessageListener(adapter, topic);
        return container;
    }
    
}
