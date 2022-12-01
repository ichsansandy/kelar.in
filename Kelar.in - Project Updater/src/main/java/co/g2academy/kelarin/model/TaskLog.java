
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
@Table(name ="t_task_log")
public class TaskLog {
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable=false)
    private String logType;
    
    @Column(nullable=false)
    private String logDescription;
    
    @ManyToOne(optional=false)
    @JoinColumn(name="user_id",nullable=false)
    private User user;
    @ManyToOne(optional=false)
    @JoinColumn(name="task_id",nullable=false)
    private Task task;
    
    public String generateDesc(String action,String type, String date, String user){
        return user + " just " +" "+action+" "+type+" "+date;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLogType() {
        return logType;
    }

    public void setLogType(String logType) {
        this.logType = logType;
    }

    public String getLogDescription() {
        return logDescription;
    }

    public void setLogDescription(String logDescription) {
        this.logDescription = logDescription;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }
    
    
}
