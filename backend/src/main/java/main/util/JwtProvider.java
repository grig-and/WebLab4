package main.util;


import io.jsonwebtoken.*;
import main.models.User;
import main.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class JwtProvider {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    @Autowired
    UserDetailsServiceImpl userDetailsService;

    private Key getSigningKey() {
        byte[] apiKeySecretBytes = secret.getBytes(StandardCharsets.UTF_8);
        return new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS512.getJcaName());
    }

    public String getUserToken(User user) {
        return Jwts.builder()
                .setExpiration(new Date((new Date()).getTime() + expiration))
                .setSubject(user.getLogin())
                .signWith(SignatureAlgorithm.HS512, getSigningKey())
                .compact();
    }

    public String getLoginFromToken(String token) {
        System.out.println(token);
       String str = Jwts.parser()
               .setSigningKey(getSigningKey())
                 .parseClaimsJws(token)
                    .getBody()
                        .getSubject();
        System.out.println(str);
       return str;
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(getSigningKey()).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
