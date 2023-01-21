package co.g2academy.kelarin.service;

import co.g2academy.kelarin.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Ichsan S
 */
@Service
public class StorageService {
    
    @Autowired
    private UserRepository repository;
    
    public String uploadImage(MultipartFile file){
        return "OK";
    }
}
