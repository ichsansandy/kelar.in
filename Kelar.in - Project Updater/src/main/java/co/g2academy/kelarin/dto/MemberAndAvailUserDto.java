
package co.g2academy.kelarin.dto;

import java.util.List;

/**
 *
 * @author Ichsan S
 */
public class MemberAndAvailUserDto {
    
    private List<String> membership;
    private List<String> availUser;

    public List<String> getMembership() {
        return membership;
    }

    public void setMembership(List<String> membership) {
        this.membership = membership;
    }

    public List<String> getAvailUser() {
        return availUser;
    }

    public void setAvailUser(List<String> availUser) {
        this.availUser = availUser;
    }
            
}
