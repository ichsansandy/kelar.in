package co.g2academy.kelarin.dto;

import co.g2academy.kelarin.model.Message;
import java.util.Date;
import static org.springframework.data.redis.serializer.RedisSerializationContext.java;

/**
 *
 * @author Ichsan S
 */
public class MessageToNotificationDto {
    
    private String pushNotificationType;
    private String description;
    private Date date;
    
    public MessageToNotificationDto(Message message){
        pushNotificationType = "message";
        String receiver = message.getReceiver().getName();
        String sender = message.getSender().getName();
        description = "";
        date = message.getCreateDate();
    }
    
    public String getPushNotificationType() {
        return pushNotificationType;
    }

    public void setPushNotificationType(String pushNotificationType) {
        this.pushNotificationType = pushNotificationType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    
    
}
