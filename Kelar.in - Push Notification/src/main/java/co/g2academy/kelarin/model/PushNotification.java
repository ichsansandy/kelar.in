
package co.g2academy.kelarin.model;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Ichsan S
 */
@Entity
@Table(name="t_push_notification")
public class PushNotification {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable=false)
    private String pushNotificationType;
    
    @Column(nullable=false)
    private String description;
    
//    @Column(nullable=false)
//    private List<User> userReceivers;
    
    @Column(nullable=false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
