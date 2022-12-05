package co.g2academy.kelarin.dto;

import java.util.Date;

/**
 *
 * @author Ichsan S
 */
public class TaskLogToPushNotificationDto {
    
    private String pushNotificationType;
    private String description;
    private Date date;

   
    
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
