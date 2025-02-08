package com.swd.project.dto.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class VerifyUserRequest {
    private String token;
}
