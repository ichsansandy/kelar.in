package co.g2academy.kelarin.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

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

    public Integer getId() {
        return Id;
    }

    public void setId(Integer Id) {
        this.Id = Id;
    }

    
    
    
    
}
