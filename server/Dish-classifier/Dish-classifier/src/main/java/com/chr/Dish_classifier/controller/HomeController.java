package com.chr.Dish_classifier.controller;

import com.chr.Dish_classifier.model.User;
import com.chr.Dish_classifier.service.ModelService;
import com.chr.Dish_classifier.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class HomeController {

    @Autowired
    private UserService userService;

    @Autowired
    private ModelService modelService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) throws Exception{

        return ResponseEntity.ok(userService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) throws Exception {

        return ResponseEntity.ok(userService.login(user));
    }

    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) throws Exception {

        String response=modelService.sendDishClassifier(file);
        return ResponseEntity.ok(response);
    }

}
