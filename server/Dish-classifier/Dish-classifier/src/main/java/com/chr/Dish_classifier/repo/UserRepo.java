package com.chr.Dish_classifier.repo;

import com.chr.Dish_classifier.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Integer> {


    User findByName(String name);

    @Query("select u from user u where u.name=?1 and u.password=?2")
    public Optional<User> getUserByNameAndPassword(String name, String password);

    Optional<User> findByNameAndPassword(String name, String password);



    Optional<User> findByApiKey(String key);
}
