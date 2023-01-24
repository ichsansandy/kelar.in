
package co.g2academy.kelarin.dto;

import co.g2academy.kelarin.model.User;
import java.util.Date;

/**
 *
 * @author Ichsan S
 */
public class NewTaskDto {
    
    private String taskName;
    private Date dueDate;
    private String user;

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    
    
}
