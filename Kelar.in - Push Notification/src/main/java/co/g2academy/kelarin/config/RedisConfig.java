package co.g2academy.kelarin.config;

import co.g2academy.kelarin.service.PushNotificationMessageListenerService;
import co.g2academy.kelarin.service.UserMessageListenerService;
import org.springframework.beans.factory.annotation.Qualifier;
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
    public JedisConnectionFactory jedisConnectionFactory() {
        return new JedisConnectionFactory();
    }

    @Bean(name = "redisPubSubTemplate")
    public RedisTemplate<String, String> redisTemplate() {
        RedisTemplate<String, String> template = new RedisTemplate<>();
        template.setConnectionFactory(jedisConnectionFactory());
        template.setValueSerializer(new GenericToStringSerializer<>(String.class));
        return template;
    }

    @Bean("userListenerAdapter")
    public MessageListenerAdapter userMessageListener(UserMessageListenerService service) {
        return new MessageListenerAdapter(service);
    }

    @Bean("pushNotificationListenerAdapter")
    public MessageListenerAdapter notificationListenerAdapter(PushNotificationMessageListenerService service) {
        return new MessageListenerAdapter(service);
    }

    @Bean
    public RedisMessageListenerContainer userMessageContainer(@Qualifier("userListenerAdapter") MessageListenerAdapter userAdapter,
            @Qualifier("pushNotificationListenerAdapter") MessageListenerAdapter pushNotificationAdapter) {
        ChannelTopic userTopic = new ChannelTopic("userCreationPubSub");
        ChannelTopic pushNotificationTopic = new ChannelTopic("pushNotificationPubSub");
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(jedisConnectionFactory());
        container.addMessageListener(userAdapter, userTopic);
        container.addMessageListener(pushNotificationAdapter, pushNotificationTopic);
        return container;
    }

}
