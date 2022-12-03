
package co.g2academy.kelarin.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericToStringSerializer;

/**
 *
 * @author Ichsan S
 */
@Configuration
public class RedisConfig {
    @Bean
    //TODO localhost 6637
    public JedisConnectionFactory jedisConnectionFactory(){
        return new JedisConnectionFactory();
    }
    
    @Bean (name="redisPubSubTemplate")
    public RedisTemplate<String, String> redisTemplate(){
        RedisTemplate<String , String> template = new RedisTemplate<>();
        template.setConnectionFactory(jedisConnectionFactory());;
        template.setValueSerializer(new GenericToStringSerializer<>(String.class));
        return template;
    }
    
    
}
