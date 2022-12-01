package co.g2academy.kelarin.model;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Ichsan S
 */
@Entity
@Table(name = "t_task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable=false)
    private String taskName;
    
    @Column(nullable=false)
    private String status;
    
    @Column(nullable=false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;
    
    @Column(nullable=true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date endDate;
    
    @ManyToOne(optional=false)
    @JoinColumn(name="user_id",nullable=false)
    private User user;
    
    @ManyToOne(optional=false)
    @JoinColumn(name="project_id",nullable=false)
    private Project project;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
    
    
    
}
