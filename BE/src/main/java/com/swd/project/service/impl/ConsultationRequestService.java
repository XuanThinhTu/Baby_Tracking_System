package com.swd.project.service.impl;

import com.swd.project.dto.request.ConsultationRequestCreation;
import com.swd.project.dto.response.ConsultationRequestDTO;
import com.swd.project.entity.*;
import com.swd.project.enums.ConsultationStatus;
import com.swd.project.enums.MembershipSubscriptionStatus;
import com.swd.project.enums.NotificationType;
import com.swd.project.enums.PermissionName;
import com.swd.project.exception.OutOfPermissionException;
import com.swd.project.mapper.ConsultationRequestMapper;
import com.swd.project.repository.*;
import com.swd.project.service.IConsultationRequestService;
import com.swd.project.service.INotificationService;
import com.swd.project.service.IUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

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
    private final UserRepository userRepository;
    private final INotificationService notificationService;

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
        Children child = childrenRepository.findById(request.getChildId()).get();
        if(child.getUser().getId() != parent.getId()){
            log.error("Child is not belong to user");
            throw new RuntimeException("You can only create consultation request for your child");
        }
        ConsultationRequest consultationRequest = new ConsultationRequest();
        consultationRequest.setRequestTitle(request.getTitle());
        consultationRequest.setNote(request.getNotes());
        consultationRequest.setStatus(ConsultationStatus.PENDING);
        consultationRequest.setRequestDate(Date.valueOf(LocalDate.now()));
        consultationRequest.setParent(parent);
        consultationRequest.setChild(child);
        consultationRequest = consultationRequestRepository.save(consultationRequest);
        return consultationRequestMapper.toConsultationRequestDTO(consultationRequest);
    }

    @Override
    public Page<ConsultationRequestDTO> getPendingConsultationRequest(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ConsultationRequest> pendingConsultations = consultationRequestRepository.findAllByStatus(ConsultationStatus.PENDING, pageable);
        return pendingConsultations.map(consultationRequestMapper::toConsultationRequestDTO);
    }

    @Override
    public Page<ConsultationRequestDTO> getAllConsultationRequest(int page, int size, ConsultationStatus status) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ConsultationRequest> consultations = consultationRequestRepository.findAllByStatus(status, pageable);
        return consultations.map(consultationRequestMapper::toConsultationRequestDTO);
    }

    @Override
    public ConsultationRequestDTO getConsultationRequestById(int id) {
        ConsultationRequest consultationRequest = consultationRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consultation request not found"));
        return consultationRequestMapper.toConsultationRequestDTO(consultationRequest);
    }

    @Override
    public ConsultationRequestDTO assignDoctor(int consultationRequestId, int doctorId) {
        ConsultationRequest consultationRequest = consultationRequestRepository.findById(consultationRequestId)
                .orElseThrow(() -> new RuntimeException("Consultation request not found"));
        if (!consultationRequest.getStatus().name().equals(ConsultationStatus.PENDING.name())) {
            log.error("Consultation request is already assigned");
            throw new RuntimeException("Consultation request is already assigned");
        }
        User doctor = userRepository.findById(doctorId).orElseThrow(() -> new RuntimeException("Doctor not found"));
        if(!doctor.getRole().getName().equals("ROLE_DOCTOR")){
            log.error("User is not a doctor");
            throw new RuntimeException("Only doctor can be assigned to consultation request");
        }
        consultationRequest.setDoctor(doctor);
        consultationRequest.setStatus(ConsultationStatus.ASSIGNED);
        consultationRequest = consultationRequestRepository.save(consultationRequest);
        notificationService.sendNotification(
                doctorId,
                "Consultation Request Assigned",
                "You have been assigned to a consultation request",
                NotificationType.CONSULTATION
        );
        return consultationRequestMapper.toConsultationRequestDTO(consultationRequest);
    }

    @Override
    public List<ConsultationRequestDTO> getAllConsultationRequestByUser() {
        List<ConsultationRequest> consultationRequests = consultationRequestRepository.findAll();
        return consultationRequests.stream().map(consultationRequestMapper::toConsultationRequestDTO).toList();
    }
}
