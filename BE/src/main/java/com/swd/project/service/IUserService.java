package com.swd.project.service;

import com.swd.project.dto.request.UserCreationRequest;
import com.swd.project.dto.response.UserDTO;
import com.swd.project.entity.User;
import jakarta.mail.MessagingException;

public interface IUserService {

    UserDTO register(UserCreationRequest request) throws MessagingException;

    UserDTO verifyEmail(String token);

    UserDTO getAuthenticatedUserDTO();

    User getAuthenticatedUser();
}
