package co.g2academy.kelarin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author Ichsan S
 */
@Entity
@Table(name="t_push_notification_detail")
public class PushNotificationDetail {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne(optional =false)
    @JoinColumn(name = "user_id",nullable =false)
    private User user;
    
    @ManyToOne(optional =false)
    @JoinColumn(name = "push_notification_id",nullable =false)
    private PushNotification pushNotification;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public PushNotification getPushNotification() {
        return pushNotification;
    }

    public void setPushNotification(PushNotification pushNotification) {
        this.pushNotification = pushNotification;
    }
    
    
}
