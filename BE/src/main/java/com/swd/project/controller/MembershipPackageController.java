package com.swd.project.controller;

import com.paypal.base.rest.PayPalRESTException;
import com.swd.project.dto.request.MembershipPackageRequest;
import com.swd.project.dto.response.ApiResponse;
import com.swd.project.dto.response.MembershipPackageResponse;
import com.swd.project.dto.response.PaymentDTO;
import com.swd.project.dto.response.PermissionDTO;
import com.swd.project.service.IPermissionService;
import com.swd.project.service.impl.MembershipPackageService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/membership-package")
@RequiredArgsConstructor
public class MembershipPackageController {
    private final MembershipPackageService membershipPackageService;
    private final IPermissionService permissionService;

    @GetMapping("/list")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<?>> getAllMembershipPackages() {
        List<MembershipPackageResponse> list = membershipPackageService.getAllMembershipPackages();
        return ResponseEntity.ok(
                ApiResponse.builder()
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
                        .message("Membership Package detail")
                        .data(membershipPackage)
                        .build()
        );
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<?>> createMembershipPackages(@RequestBody MembershipPackageRequest request) {
        MembershipPackageResponse membershipPackage = membershipPackageService.createMembershipPackage(request);
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .message("Membership Package created successfully")
                        .data(membershipPackage)
                        .build()
        );
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<?>> updateMembershipPackagesById(
            @PathVariable int id,
            @RequestBody MembershipPackageRequest request
    ) {
        MembershipPackageResponse membershipPackage = membershipPackageService.updateMembershipPackage(id, request);
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .message("Membership Package updated successfully")
                        .data(membershipPackage)
                        .build()
        );
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<?>> deleteMembershipPackagesById(
            @PathVariable int id
    ) {
        membershipPackageService.deleteMembershipPackage(id);
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .message("Membership Package deleted successfully")
                        .build()
        );
    }

    @PutMapping("/enable/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<?>> enableMembershipPackagesById(
            @PathVariable int id
    ) {
        membershipPackageService.enableMembershipPackage(id);
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .message("Membership Package enable successfully")
                        .build()
        );
    }

    @PutMapping("/disable/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<?>> disableMembershipPackagesById(
            @PathVariable int id
    ) {
        membershipPackageService.disableMembershipPackage(id);
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .message("Membership Package disable successfully")
                        .build()
        );
    }

    @PostMapping("/payment/{membershipId}")
    @SecurityRequirement(name = "bearerAuth")
    public ApiResponse<PaymentDTO> createMembershipPayment(@PathVariable int membershipId) throws PayPalRESTException {
        PaymentDTO paymentDTO = membershipPackageService.createMembershipPayment(membershipId);
        return ApiResponse.<PaymentDTO>builder()
                .message("Payment created successfully")
                .data(paymentDTO)
                .build();
    }

    @GetMapping("/execute")
    @SecurityRequirement(name = "bearerAuth")
    public ApiResponse<?> executePayment(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) throws PayPalRESTException {
        return ApiResponse.builder()
                .message("Payment executed successfully")
                .data(membershipPackageService.executeMembershipPayment(paymentId, payerId))
                .build();
    }

    @GetMapping("/my-package")
    @SecurityRequirement(name = "bearerAuth")
    public ApiResponse<?> getUserMembership(){
        return ApiResponse.builder()
                .message("User Membership Package")
                .data(membershipPackageService.getUserMembership())
                .build();
    }

    @GetMapping("/permissions")
    public ApiResponse<List<PermissionDTO>> getAllPermissions() {
        return ApiResponse.<List<PermissionDTO>>builder()
                .message("Permissions listed successfully")
                .data(permissionService.getAllPermissions())
                .build();
    }

}
