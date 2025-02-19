package com.swd.project.controller;

import com.swd.project.dto.response.ApiResponse;
import com.swd.project.service.Impl.StandardIndexService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/standard-index")
@RequiredArgsConstructor
public class StandardIndexController {

    private final StandardIndexService standardIndexService;

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllStandardIndexData() {
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .statusCode(200)
                        .message("List of standard tracking data")
                        .data(standardIndexService.getALLStandardIndex())
                        .build()
        );
    }
}
