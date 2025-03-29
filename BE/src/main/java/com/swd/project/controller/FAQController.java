package com.swd.project.controller;

import com.swd.project.dto.request.FAQRequest;
import com.swd.project.dto.response.ApiResponse;
import com.swd.project.service.impl.FAQService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RequestMapping("/faq")
@RestController
@RequiredArgsConstructor
public class FAQController {
    private final FAQService faqService;

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllFAQs() {
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .message("List of FAQs")
                        .data(faqService.getAllFAQ())
                        .build()
        );
    }

    @PostMapping
//    @SecurityRequirement(name = "bearerAuth")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<?>> createFAQs(@RequestBody FAQRequest request) {
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .message("List of FAQs")
                        .data(faqService.createFAQ(request))
                        .build()
        );
    }

    @PutMapping("/{faqId}")
//    @SecurityRequirement(name = "bearerAuth")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<?>> updateFAQs(@PathVariable int faqId, @RequestBody FAQRequest request) {
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .message("List of FAQs")
                        .data(faqService.updateFAQ(faqId, request))
                        .build()
        );
    }

    @DeleteMapping("/{faqId}")
//    @SecurityRequirement(name = "bearerAuth")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<?>> deleteFAQs(@PathVariable int faqId) {
        faqService.deleteFAQ(faqId);
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .message("FAQ with id: " + faqId + " deleted successfully!!")
                        .build()
        );
    }
}
