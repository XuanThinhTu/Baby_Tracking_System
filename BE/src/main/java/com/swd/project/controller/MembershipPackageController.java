package com.swd.project.controller;

import com.swd.project.dto.request.MembershipPackageRequest;
import com.swd.project.dto.response.ApiResponse;
import com.swd.project.dto.response.MembershipPackageResponse;
import com.swd.project.service.Impl.MembershipPackageService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("membership-package")
@RequiredArgsConstructor
public class MembershipPackageController {
    private final MembershipPackageService membershipPackageService;

    @GetMapping()
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<?>> getAllMembershipPackages() {
        List<MembershipPackageResponse> list = membershipPackageService.getAllMembershipPackages();
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Membership Package listed successfully")
                        .data(list)
                        .build()
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<?>> getMembershipPackagesById(@PathVariable int id) {
        MembershipPackageResponse membershipPackage = membershipPackageService.getMembershipPackageById(id);
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Membership Package detail")
                        .data(membershipPackage)
                        .build()
        );
    }

    @PostMapping()
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<?>> createMembershipPackages(@RequestBody MembershipPackageRequest request) {
        MembershipPackageResponse membershipPackage = membershipPackageService.createMembershipPackage(request);
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Membership Package created successfully")
                        .data(membershipPackage)
                        .build()
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<?>> updateMembershipPackagesById(
            @PathVariable int id,
            @RequestBody MembershipPackageRequest request
    ) {
        MembershipPackageResponse membershipPackage = membershipPackageService.updateMembershipPackage(id, request);
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Membership Package updated successfully")
                        .data(membershipPackage)
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<?>> deleteMembershipPackagesById(
            @PathVariable int id
    ) {
        membershipPackageService.deleteMembershipPackage(id);
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Membership Package deleted successfully")
                        .build()
        );
    }

    @PutMapping("/{id}/enable")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<?>> enableMembershipPackagesById(
            @PathVariable int id
    ) {
        membershipPackageService.enableMembershipPackage(id);
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Membership Package enable successfully")
                        .build()
        );
    }

    @PutMapping("/{id}/disable")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<?>> disableMembershipPackagesById(
            @PathVariable int id
    ) {
        membershipPackageService.disableMembershipPackage(id);
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Membership Package disable successfully")
                        .build()
        );
    }
}
