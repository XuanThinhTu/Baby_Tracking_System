package com.swd.project.service.impl;

import com.swd.project.dto.request.ConsultationRequestCreation;
import com.swd.project.dto.response.ConsultationRequestDTO;
import com.swd.project.entity.*;
import com.swd.project.enums.ConsultationStatus;
import com.swd.project.enums.MembershipSubscriptionStatus;
import com.swd.project.enums.PermissionName;
import com.swd.project.exception.OutOfPermissionException;
import com.swd.project.mapper.ConsultationRequestMapper;
import com.swd.project.repository.*;
import com.swd.project.service.IConsultationRequestService;
import com.swd.project.service.IUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Slf4j
public class ConsultationRequestService implements IConsultationRequestService {

    private final ConsultationRequestRepository consultationRequestRepository;
    private final IUserService userService;
    private final MembershipPackageRepository membershipPackageRepository;
    private final MembershipSubscriptionRepository membershipSubscriptionRepository;
    private final PermissionRepository permissionRepository;
    private final ChildrenRepository childrenRepository;
    private final ConsultationRequestMapper consultationRequestMapper;

    @Override
    public ConsultationRequestDTO createConsultationRequest(ConsultationRequestCreation request) {
        User parent = userService.getAuthenticatedUser();
        //validate user has membership subscription
        MembershipSubscription userSubscription = membershipSubscriptionRepository
                .findByUserIdAndStatus(parent.getId(), MembershipSubscriptionStatus.AVAILABLE)
                .orElseThrow(() -> new RuntimeException("User has no active subscription"));
        MembershipPackage membershipPackage = membershipPackageRepository.findById(userSubscription.getMembershipPackage().getId()).get();
        Permission permission = permissionRepository.findById(PermissionName.CONSULTATION_REQUEST.toString()).get();
        if(!membershipPackage.getPermissions().contains(permission)) {
            log.error("User has no permission to create consultation request log");
            throw new OutOfPermissionException("You has no permission to create consultation request");
        }
        ConsultationRequest consultationRequest = new ConsultationRequest();
        consultationRequest.setRequestTitle(request.getTitle());
        consultationRequest.setNote(request.getNotes());
        consultationRequest.setStatus(ConsultationStatus.PENDING);
        consultationRequest.setRequestDate(Date.valueOf(LocalDate.now()));
        consultationRequest.setParent(parent);
        Children child = childrenRepository.findById(Integer.parseInt(request.getChildId())).get();
        consultationRequest.setChild(child);
        consultationRequest = consultationRequestRepository.save(consultationRequest);
        return consultationRequestMapper.toConsultationRequestDTO(consultationRequest);
    }
}
