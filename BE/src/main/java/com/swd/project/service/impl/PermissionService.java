package com.swd.project.service.impl;

import com.swd.project.dto.response.PermissionDTO;
import com.swd.project.mapper.PermissionMapper;
import com.swd.project.repository.PermissionRepository;
import com.swd.project.service.IPermissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PermissionService implements IPermissionService {

    private final PermissionRepository permissionRepository;
    private final PermissionMapper permissionMapper;

    @Override
    public List<PermissionDTO> getAllPermissions() {
        return permissionRepository.findAll().stream().map(
                permissionMapper::toPermissionDTO
        ).toList();
    }
}
