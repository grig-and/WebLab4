package main.controllers;

import main.models.User;
import main.service.UserService;
import main.util.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtProvider jwtProvider;

    @CrossOrigin
    @PostMapping("/signup")
    ResponseEntity<?> register(@RequestBody User user) {
        if (userService.findByLogin(user.getLogin()) != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try {
            userService.save(user);
            String jwt = jwtProvider.getUserToken(user);
            return ResponseEntity.ok(jwt);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin
    @PostMapping("/login")
    ResponseEntity<?> logIn(@RequestBody User user) {
        if (userService.getMatch(user)) {
            String jwt = jwtProvider.getUserToken(user);
            return ResponseEntity.ok(jwt);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

}
