package com.swd.project.dto.response;

import com.swd.project.entity.Permission;

import java.util.Set;

public record MembershipPackageResponse(
    int id,
    String name,
    String description,
    double price,
    int duration,
    boolean isEnable,
    Set<String> permissions
){

}
