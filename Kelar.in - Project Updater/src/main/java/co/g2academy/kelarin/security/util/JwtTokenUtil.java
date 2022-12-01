package co.g2academy.kelarin.security.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

/**
 *
 * @author Ichsan S
 */
@Component
public class JwtTokenUtil implements Serializable {
    
    
    public static final long JWT_TOKEN_VALIDITY = 5*60*60 * 1000; //5 hour
    
    @Value("${jwt.secret}")
    private String secret;
    
    private Claims getAllClaimFromToken(String token){
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }
   
    public String getUsernameFromToken (String token) {
        Claims claim = getAllClaimFromToken(token);
        return claim.getSubject();
    }
    
    private Date getExpirationDateFromToken (String token){
        Claims claim = getAllClaimFromToken(token);
        return claim.getExpiration();
    }
    
    public Boolean isTokenExpired (String token){
        Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
    
    public String generateToken (UserDetails userDetails){
        Map <String, Object> claims = new HashMap<>();
        return Jwts.builder().setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+JWT_TOKEN_VALIDITY))
                .signWith(SignatureAlgorithm.HS512, secret).compact();
    }
    
    public Boolean validateToken (String token , UserDetails userDetails){
        String username = getUsernameFromToken(token);
        return username.equals(userDetails.getUsername() ) && !isTokenExpired(token);
        
    }
}
