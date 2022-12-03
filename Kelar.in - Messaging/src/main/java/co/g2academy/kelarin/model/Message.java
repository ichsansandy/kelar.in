package co.g2academy.kelarin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


/**
 *
 * @author Ichsan S
 */
@Entity
@Table(name="t_message")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;
    
    @ManyToOne(optional=false)
    @JoinColumn(name="sender_id",nullable=false)
    private User sender;
    
    @ManyToOne(optional=false)
    @JoinColumn(name="receiver_id",nullable=false)
    private User receiver;
    
    @Column(nullable=false)
    @Lob
    private String message;
    
    @ManyToOne(optional = false)
    @JoinColumn(name = "message_room_id", nullable = false)
    private MessageRoom messageRoom;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer Id) {
        this.Id = Id;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public MessageRoom getMessageRoom() {
        return messageRoom;
    }

    public void setMessageRoom(MessageRoom messageRoom) {
        this.messageRoom = messageRoom;
    }
    
}
