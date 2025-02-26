package com.swd.project.service.impl;

import com.swd.project.config.security.jwt.JwtUtils;
import com.swd.project.config.security.jwt.UserDetailsImpl;
import com.swd.project.dto.request.AuthenticationRequest;
import com.swd.project.dto.request.RefreshTokenRequest;
import com.swd.project.dto.response.AuthenticationResponse;
import com.swd.project.service.IAuthenticationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.Date;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationService implements IAuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @Override
    public AuthenticationResponse login(AuthenticationRequest request) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String token = jwtUtils.generateJwtToken(userDetails);
        return new AuthenticationResponse(token);

    }

    @Override
    public AuthenticationResponse refreshToken(RefreshTokenRequest request) {
        var token = request.getAccessToken();
        Date refreshableDate = new Date(
                jwtUtils.getExpDateFromToken(token)
                        .toInstant()
                        .plus(7, ChronoUnit.DAYS)
                        .toEpochMilli()
        );
        if(refreshableDate.after(new Date())){
            String email = jwtUtils.getEmailFromJwtToken(token);
            String newToken = jwtUtils.generateTokenFromUsername(email);
            log.info("Token has been refreshed");
            return new AuthenticationResponse(newToken);
        }else{
            throw new RuntimeException("Token is expired");
        }
    }
}
