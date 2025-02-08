package com.swd.project.controller;

import com.swd.project.dto.response.ApiResponse;
import com.swd.project.dto.response.ChildrenDTO;
import com.swd.project.service.IChildrenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/children")
@RequiredArgsConstructor
public class ChildrenController {

    private final IChildrenService childrenService;

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ChildrenDTO> addChildren(
            @RequestParam("name") String name,
            @RequestParam("birthDate") String birthDate,
            @RequestParam("gender") String gender){
        ChildrenDTO childrenDTO = childrenService.addChildren(name, birthDate, gender);
        return ApiResponse.<ChildrenDTO>builder()
                .statusCode(HttpStatus.CREATED.value())
                .message("Children added")
                .data(childrenDTO)
                .build();
    }

    @GetMapping("/info/{id}")
    public ApiResponse<ChildrenDTO> getChildrenById(@PathVariable int id){
        ChildrenDTO childrenDTO = childrenService.getChildrenById(id);
        return ApiResponse.<ChildrenDTO>builder()
                .statusCode(HttpStatus.OK.value())
                .message("Children profile retrieved")
                .data(childrenDTO)
                .build();
    }

    @GetMapping("/list/{parentId}")
    public ApiResponse<List<ChildrenDTO>> getChildrenByParentId(@PathVariable int parentId){
        List<ChildrenDTO> childrenDTOList = childrenService.getChildrenByParentId(parentId);
        return ApiResponse.<List<ChildrenDTO>>builder()
                .statusCode(HttpStatus.OK.value())
                .message("Children list retrieved")
                .data(childrenDTOList)
                .build();
    }
}
