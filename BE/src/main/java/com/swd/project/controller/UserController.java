package com.swd.project.controller;


import com.swd.project.dto.request.UserCreationRequest;
import com.swd.project.dto.request.VerifyUserRequest;
import com.swd.project.dto.response.ApiResponse;
import com.swd.project.dto.response.UserDTO;
import com.swd.project.service.IUserService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<UserDTO> registerUser(@RequestBody UserCreationRequest request) throws MessagingException {
        UserDTO userDTO = userService.register(request);
        return ApiResponse.<UserDTO>builder()
                .statusCode(HttpStatus.CREATED.value())
                .message("User registered successfully")
                .data(userDTO)
                .build();
    }

    @PostMapping("/verify")
    public ApiResponse<UserDTO> verifyUser(@RequestBody VerifyUserRequest request){
        UserDTO userDTO = userService.verifyEmail(request.getToken());
        return ApiResponse.<UserDTO>builder()
                .statusCode(HttpStatus.OK.value())
                .message("User verified successfully")
                .data(userDTO)
                .build();
    }

    @GetMapping("/p")
    public ApiResponse<UserDTO> getAuthUser(){
        UserDTO userDTO = userService.getAuthenticatedUserDTO();
        return ApiResponse.<UserDTO>builder()
                .statusCode(HttpStatus.OK.value())
                .message("User retrieved successfully")
                .data(userDTO)
                .build();
    }

}
