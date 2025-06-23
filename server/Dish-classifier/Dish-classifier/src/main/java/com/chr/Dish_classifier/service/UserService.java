package com.chr.Dish_classifier.service;

import com.chr.Dish_classifier.model.User;
import com.chr.Dish_classifier.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;
import java.security.SecureRandom;
import java.util.Base64;
@Service
public class UserService {

    @Autowired
    private UserRepo repo;

    public User register(User user) throws Exception {
        if(user.getName()==null) {
            throw new Exception("user name cannot be empty");
        }
        User user1=repo.findByName(user.getName());
        if(user1!=null){
            throw new Exception("username already exists");
        }
        if(user.getPassword()==null){
            throw new Exception("password cannot be null");
        }
        String key=generateKey();
        user.setApiKey(key);

        return repo.save(user);
    }

    public String generateKey(){
        String key =UUID.randomUUID().toString();

        SecureRandom random=new SecureRandom();
        byte[] bytes=new byte[32];
        random.nextBytes(bytes);

        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    public User login(User user) throws Exception {

        Optional<User> u =repo.findByNameAndPassword(user.getName(), user.getPassword());

        if(u.isPresent()){
            return u.get();
        }else{
            throw new Exception("User not found ");
        }

    }
}
