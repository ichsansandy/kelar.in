
package co.g2academy.kelarin.dto;

import java.util.Date;
import static org.springframework.data.redis.serializer.RedisSerializationContext.java;

/**
 *
 * @author Ichsan S
 */
public class NotificationFirestoreModel {
    
    private String type;
    private Integer typeId;
    private String message;
    private Date createDate;
    private Boolean isRead;

    public NotificationFirestoreModel() {
    }
    
    public NotificationFirestoreModel(String type, Integer typeId, String message, Date createDate, Boolean isRead) {
        this.type = type;
        this.typeId = typeId;
        this.message = message;
        this.createDate = createDate;
        this.isRead = isRead;
    }
    
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Boolean getIsRead() {
        return isRead;
    }

    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }
    
    
}
