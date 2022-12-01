package co.g2academy.kelarin.validator;

import java.util.regex.Pattern;
import org.springframework.stereotype.Component;

/**
 *
 * @author Ichsan S
 */
@Component
public class UserPassRegex1 {

    private String RegexEmail = "^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+$";
    private String RegexPassword ="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,30}$";
    
    public boolean emailValidator(String email){
        return Pattern.matches(RegexEmail, email);
    }
    public boolean passwordValidator(String password){
        return Pattern.matches(RegexPassword, password);
    }
    public boolean validatorLogin(String email, String password){
        if(emailValidator(email) == true && passwordValidator(password) == true){
            return true;
        }
        return false;
    }
}
