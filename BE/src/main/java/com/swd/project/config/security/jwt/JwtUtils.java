package com.swd.project.config.security.jwt;

import com.swd.project.entity.User;
import com.swd.project.repository.UserRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

@Component
@Slf4j
public class JwtUtils {

    @Value("${baby.app.jwtSecret}")
    private String jwtSecret;
    @Value("${baby.app.jwtExpirationMs}")
    private int jwtExpirationMs;
    @Autowired
    private UserRepository userRepository;

    private Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(jwtSecret));
    }

    public boolean validateToken(String jwt){
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parse(jwt);
            return true;
        }catch (MalformedJwtException e){
            log.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }

    public String getUserNameFromJwtToken(String jwt){
        return Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(jwt).getBody().getSubject();
    }

    public String generateTokenFromUsername(String email){
        User user = userRepository.findByEmail(email).get();
        return Jwts.builder()
                .setSubject(email)
                .setIssuer("baby-tracking-system")
                .claim("userId", user.getId())
                .claim("role", user.getRole().getName())
                .signWith(key(), SignatureAlgorithm.HS256)
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + jwtExpirationMs))
                .setId(String.valueOf(UUID.randomUUID()))
                .compact();
    }

    public String generateJwtToken(UserDetailsImpl userPrincipal){
        return generateTokenFromUsername(userPrincipal.getUsername());
    }

    public String generateVerificationToken(String username){
        return Jwts.builder()
                .setSubject(username)
                .setIssuer("homelet")
                .signWith(key(), SignatureAlgorithm.HS256)
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().toInstant().plus(1, ChronoUnit.DAYS).toEpochMilli()))
                .setId(String.valueOf(UUID.randomUUID()))
                .compact();
    }

    public Date getExpDateFromToken(String token){
        return Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody().getExpiration();
    }
}
