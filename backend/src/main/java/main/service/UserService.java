package main.service;

import main.models.User;
import main.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User findByLogin(String login){
        return userRepository.findByLogin(login);
    }

    public User save(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public boolean getMatch(User user){
        if (findByLogin(user.getLogin()) == null) {
            return false;
        }

        User required = findByLogin(user.getLogin());
        return passwordEncoder.matches(user.getPassword(), required.getPassword());
    }

    public boolean getMatch(String login, String password) {
        if (findByLogin(login) == null) {
            return false;
        }

        User required = findByLogin(login);
        return passwordEncoder.matches(password, required.getPassword());
    }
}
