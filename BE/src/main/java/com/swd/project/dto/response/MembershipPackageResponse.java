package com.swd.project.dto.response;

public record MembershipPackageResponse(
    int id,
    String name,
    String description,
    double price,
    int duration,
    boolean isEnable
){

}
