package com.swd.project.controller;

import com.swd.project.dto.request.AuthenticationRequest;
import com.swd.project.dto.request.RefreshTokenRequest;
import com.swd.project.dto.response.ApiResponse;
import com.swd.project.dto.response.AuthenticationResponse;
import com.swd.project.service.IAuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final IAuthenticationService authenticationService;

    @PostMapping("/login")
    public ApiResponse<AuthenticationResponse> loginUser(@RequestBody AuthenticationRequest request){
        return ApiResponse.<AuthenticationResponse>builder()
                .message("Login successful")
                .data(authenticationService.login(request))
                .build();
    }

    @PostMapping("/refresh")
    public ApiResponse<AuthenticationResponse> refreshToken(@RequestBody RefreshTokenRequest request){
        return ApiResponse.<AuthenticationResponse>builder()
                .message("Token refreshed")
                .data(authenticationService.refreshToken(request))
                .build();
    }

}
