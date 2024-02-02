package com.index.index.controller;

import com.index.index.model.User;
import com.index.index.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/register")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if(userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("{\"message\": \"Email already in use\"}");
        }
        userRepository.save(user);
        return ResponseEntity.ok().body("{\"message\": \"User registered successfully\"}");
    }    


    
}
