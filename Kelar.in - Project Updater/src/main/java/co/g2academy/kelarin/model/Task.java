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
    
    @Column(nullable=true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;
    
    @Column(nullable=false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date dueDate;
    
    @Column(nullable=true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date endDate;
    
    
    @ManyToOne(optional=false)
    @JoinColumn(name="project_id",nullable=false)
    private Project project;
    
    @ManyToOne(optional=false)
    @JoinColumn(name="assign_user_id",nullable=false)
    private User assignUser;

    public User getAssignUser() {
        return assignUser;
    }

    public void setAssignUser(User assignUser) {
        this.assignUser = assignUser;
    }
    
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

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }
    

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }


    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
    
    
    
}
