package com.swd.project.service.Impl;

import com.swd.project.config.security.jwt.JwtUtils;
import com.swd.project.dto.request.UserCreationRequest;
import com.swd.project.dto.response.UserDTO;
import com.swd.project.entity.Role;
import com.swd.project.entity.User;
import com.swd.project.exception.ResourceAlreadyExistException;
import com.swd.project.exception.ResourceNotFoundException;
import com.swd.project.mapper.UserMapper;
import com.swd.project.repository.RoleRepository;
import com.swd.project.repository.UserRepository;
import com.swd.project.service.IUserService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    private final EmailService emailService;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDTO register(UserCreationRequest request) throws MessagingException {
        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new ResourceAlreadyExistException("Email already in used");
        }else if(userRepository.findByPhone(request.getPhone()).isPresent()){
            throw new ResourceAlreadyExistException("Phone already in used");
        }
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setAvatar(null);
        user.setActive(false);
        user.setBanned(false);
        Role role = roleRepository.findByName("ROLE_USER").orElseThrow(() -> new ResourceNotFoundException("Role not found"));
        user.setRole(role);
        User savedUser = userRepository.save(user);
        emailService.sendEmail(
                savedUser.getEmail(),
                emailService.subjectRegister(),
                emailService.bodyRegister(
                        savedUser.getEmail(),
                        savedUser.getFirstName(),
                        savedUser.getLastName(),
                        savedUser.getPhone(),
                        savedUser.getAddress())
                );
        return userMapper.toUserDTO(savedUser);
    }

    @Override
    public UserDTO verifyEmail(String token) {
        String email = jwtUtils.getEmailFromJwtToken(token);
        Date expirationDate = jwtUtils.getExpDateFromToken(token);
        if(!expirationDate.before(new Date())){
            User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
            user.setActive(true);
            User savedUser = userRepository.save(user);
            return userMapper.toUserDTO(savedUser);
        }else{
            throw new RuntimeException("Time to verify email is expired");
        }
    }

    @Override
    public UserDTO getAuthenticatedUserDTO() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return userMapper.toUserDTO(user);
    }

    @Override
    public User getAuthenticatedUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
