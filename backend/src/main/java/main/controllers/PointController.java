package main.controllers;

import main.models.Point;
import main.service.PointService;
import main.service.UserService;
import main.util.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/points")
public class PointController {
    @Autowired
    private PointService pointService;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtProvider jwtProvider;

    @CrossOrigin
    @PostMapping("/add")
    ResponseEntity<?> addPoint(@RequestBody Point point, @RequestHeader("Authorization") String token){
        point.setCurrentTime(System.currentTimeMillis());
        long start = System.nanoTime();
        String jwt = token.substring(7);
        String login = jwtProvider.getLoginFromToken(jwt);
        point.setUser(userService.findByLogin(login));
        point.setExecutionTime(System.nanoTime() - start);
        pointService.save(point);
        return ResponseEntity.ok(point);
    }

    @CrossOrigin
    @GetMapping("/get")
    ResponseEntity<?> getPoints(@RequestHeader("Authorization") String token){
        String jwt = token.substring(7);
        String login = jwtProvider.getLoginFromToken(jwt);
        try{
            Collection<Point> points = pointService.findByUser(userService.findByLogin(login));
            return ResponseEntity.ok(points);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin
    @DeleteMapping("/clear")
    void clear(@RequestHeader("Authorization") String token){
        String jwt = token.substring(7);
        String login = jwtProvider.getLoginFromToken(jwt);
        pointService.clear(userService.findByLogin(login));
    }
}
