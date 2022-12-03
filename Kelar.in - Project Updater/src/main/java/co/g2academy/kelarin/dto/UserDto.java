package co.g2academy.kelarin.dto;

import co.g2academy.kelarin.model.User;

/**
 *
 * @author Ichsan S
 */
public class UserDto {
    
    private String name;
    private String username;

    public UserDto(User u) {
        name = u.getName();
        username = u.getUsername();
    }
    
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
}
