
package co.g2academy.kelarin.security.model;

/**
 *
 * @author Ichsan S
 */
public class JwtResponse {
    
    private String token;

    public JwtResponse(String token) {
        this.token = token;
    }

    
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    
}
