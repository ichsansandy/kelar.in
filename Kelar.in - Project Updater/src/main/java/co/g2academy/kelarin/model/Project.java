package co.g2academy.kelarin.model;

import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import static org.springframework.data.redis.serializer.RedisSerializationContext.java;

/**
 *
 * @author Ichsan S
 */
@Entity
@Table(name = "t_project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;
    
    @Column(nullable=false)
    private String name;
    
    @Column(nullable=false)
    private String status;
    
    @Column(nullable=false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;
    
    @Column(nullable=false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date dueDate;
    
    @Column(nullable=true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date endDate;
    
    @Lob
    @Column(nullable=true, length=1000)
    private byte[] projectLogoImage;
    
    @ManyToOne(optional=false)
    @JoinColumn(name="user_id",nullable=false)
    private User user;
    
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Membership> memberships;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer Id) {
        this.Id = Id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
  
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public List<Membership> getMemberships() {
        return memberships;
    }

    public void setMemberships(List<Membership> memberships) {
        this.memberships = memberships;
    }

    public byte[] getProjectLogoImage() {
        return projectLogoImage;
    }

    public void setProjectLogoImage(byte[] projectLogoImage) {
        this.projectLogoImage = projectLogoImage;
    }
    
    
}
