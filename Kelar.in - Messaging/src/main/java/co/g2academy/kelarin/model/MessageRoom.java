package co.g2academy.kelarin.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;

/**
 *
 * @author Ichsan S
 */
@Entity
@Table(name = "t_message_room")
public class MessageRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(optional=false)
    @JoinColumn(name="user1_id",nullable=false)
    private User user1;
    
    @ManyToOne(optional=false)
    @JoinColumn(name="user2_id",nullable=false)
    private User user2;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "messageUser1")
    private List<Message> user1Messages;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "messageUser2")
    private List<Message> user2Messages;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser1() {
        return user1;
    }

    public void setUser1(User user1) {
        this.user1 = user1;
    }

    public User getUser2() {
        return user2;
    }

    public void setUser2(User user2) {
        this.user2 = user2;
    }

    public List<Message> getUser1Messages() {
        return user1Messages;
    }

    public void setUser1Messages(List<Message> user1Messages) {
        this.user1Messages = user1Messages;
    }

    public List<Message> getUser2Messages() {
        return user2Messages;
    }

    public void setUser2Messages(List<Message> user2Messages) {
        this.user2Messages = user2Messages;
    }
    
    
}
