package co.g2academy.kelarin.dto;

import co.g2academy.kelarin.model.TaskLog;
import java.util.Date;
import static org.springframework.data.redis.serializer.RedisSerializationContext.java;

/**
 *
 * @author Ichsan S
 */
public class TaskLogToPushNotificationDto {
    
    private String pushNotificationType;
    private String description;
    private Date date;

   public TaskLogToPushNotificationDto(TaskLog tasklog){
       pushNotificationType = tasklog.getLogType();
       description = tasklog.getLogDescription();
       date = new Date();
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
