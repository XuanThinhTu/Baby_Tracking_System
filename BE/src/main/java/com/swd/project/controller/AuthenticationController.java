package com.swd.project.controller;

import com.swd.project.dto.request.AuthenticationRequest;
import com.swd.project.dto.response.ApiResponse;
import com.swd.project.dto.response.AuthenticationResponse;
import com.swd.project.service.IAuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final IAuthenticationService authenticationService;

    @PostMapping("/login")
    public ApiResponse<AuthenticationResponse> loginUser(@RequestBody AuthenticationRequest request){
        return ApiResponse.<AuthenticationResponse>builder()
                .statusCode(HttpStatus.OK.value())
                .message("Login successful")
                .data(authenticationService.login(request))
                .build();
    }

}
