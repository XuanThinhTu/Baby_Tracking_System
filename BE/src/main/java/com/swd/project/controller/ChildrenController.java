package com.swd.project.controller;

import com.swd.project.dto.response.ApiResponse;
import com.swd.project.dto.response.ChildrenDTO;
import com.swd.project.service.IChildrenService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/children")
@RequiredArgsConstructor
public class ChildrenController {

    private final IChildrenService childrenService;

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    @SecurityRequirement(name = "bearerAuth")
    public ApiResponse<ChildrenDTO> addChildren(
            @RequestParam("name") String name,
            @RequestParam("birthDate") String birthDate,
            @RequestParam("gender") String gender){
        ChildrenDTO childrenDTO = childrenService.addChildren(name, birthDate, gender);
        return ApiResponse.<ChildrenDTO>builder()
                .message("Children added")
                .data(childrenDTO)
                .build();
    }

    @GetMapping("/info/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ApiResponse<ChildrenDTO> getChildrenById(@PathVariable int id){
        ChildrenDTO childrenDTO = childrenService.getChildrenById(id);
        return ApiResponse.<ChildrenDTO>builder()
                .message("Children profile retrieved")
                .data(childrenDTO)
                .build();
    }

    @GetMapping("/list/{parentId}")
    @SecurityRequirement(name = "bearerAuth")
    public ApiResponse<List<ChildrenDTO>> getChildrenByParentId(@PathVariable int parentId){
        List<ChildrenDTO> childrenDTOList = childrenService.getChildrenByParentId(parentId);
        return ApiResponse.<List<ChildrenDTO>>builder()
                .message("Children list retrieved")
                .data(childrenDTOList)
                .build();
    }
}
