package com.swd.project.service;

import com.swd.project.dto.response.PermissionDTO;

import java.util.List;

public interface IPermissionService {

    List<PermissionDTO> getAllPermissions();
}
