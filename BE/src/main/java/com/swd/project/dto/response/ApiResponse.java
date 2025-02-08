package com.swd.project.dto.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ApiResponse<T> {
    private int statusCode;
    private String message;
    private T data;
}
