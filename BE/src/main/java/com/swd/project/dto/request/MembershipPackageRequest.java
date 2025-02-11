package com.swd.project.dto.request;

public record MembershipPackageRequest(
    String name,
    String description,
    double price,
    int duration
){
}

