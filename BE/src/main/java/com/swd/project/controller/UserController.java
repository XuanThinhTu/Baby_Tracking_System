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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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
                .message("User registered")
                .data(userDTO)
                .build();
    }

    @PostMapping("/verify")
    public ApiResponse<UserDTO> verifyUser(@RequestBody VerifyUserRequest request){
        UserDTO userDTO = userService.verifyEmail(request.getToken());
        return ApiResponse.<UserDTO>builder()
                .statusCode(HttpStatus.OK.value())
                .message("User verified")
                .data(userDTO)
                .build();
    }

    @GetMapping("/p")
    public ApiResponse<UserDTO> getAuthUser(){
        UserDTO userDTO = userService.getAuthenticatedUserDTO();
        return ApiResponse.<UserDTO>builder()
                .statusCode(HttpStatus.OK.value())
                .message("User profile retrieved")
                .data(userDTO)
                .build();
    }

    @PostMapping("/p/update")
    public ApiResponse<UserDTO> updateUserProfile(
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("phone") String phone,
            @RequestParam("address") String address,
            @RequestParam("avatar") MultipartFile avatar
    ) throws IOException {
        UserDTO userDTO = userService.updateUserProfile(firstName, lastName, phone, address, avatar);
        return ApiResponse.<UserDTO>builder()
                .statusCode(HttpStatus.OK.value())
                .message("User profile updated")
                .data(userDTO)
                .build();
    }

    @PostMapping("/p/update/password")
    public ApiResponse<UserDTO> updatePassword(@RequestParam("oldPassword") String oldPassword,
                                               @RequestParam("newPassword") String newPassword){
        UserDTO userDTO = userService.updatePassword(oldPassword, newPassword);
        return ApiResponse.<UserDTO>builder()
                .statusCode(HttpStatus.OK.value())
                .message("Password updated")
                .data(userDTO)
                .build();
    }

}
