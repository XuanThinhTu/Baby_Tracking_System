package com.swd.project.mapper;

import com.swd.project.dto.response.PermissionDTO;
import com.swd.project.entity.Permission;
import org.springframework.stereotype.Component;

@Component
public class PermissionMapper {

    public PermissionDTO toPermissionDTO(Permission permission) {
        return PermissionDTO.builder()
                .permissionName(permission.getPermissionName())
                .build();
    }
}
