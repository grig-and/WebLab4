package main.util;

import main.service.UserDetailsServiceImpl;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Service
public class JwtFilter extends GenericFilterBean {

    private final JwtProvider jwtProvider;
    private final UserDetailsServiceImpl userDetailsService;

    public JwtFilter(JwtProvider jwtProvider, UserDetailsServiceImpl userDetailsService) {
        this.jwtProvider = jwtProvider;
        this.userDetailsService = userDetailsService;
    }


    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        String token = jwtProvider.resolveToken((HttpServletRequest) servletRequest);
        if (token != null && jwtProvider.validateToken(token)) {
            String login = jwtProvider.getLoginFromToken(token);
            try {
                UserDetails userDetails = userDetailsService.loadUserByUsername(login);
                Authentication auth = new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (Exception e) {
                SecurityContextHolder.clearContext();
            }
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }
}
