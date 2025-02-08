package com.swd.project.service;

import com.swd.project.dto.request.AuthenticationRequest;
import com.swd.project.dto.response.AuthenticationResponse;

public interface IAuthenticationService {

    AuthenticationResponse login(AuthenticationRequest request);
}
