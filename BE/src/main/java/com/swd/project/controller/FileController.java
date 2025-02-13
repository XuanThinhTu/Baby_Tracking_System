package com.swd.project.controller;

import com.swd.project.dto.response.ApiResponse;
import com.swd.project.service.IFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/import")
public class FileController {

    private final IFileService fileService;

    // Import file excel for under 5 years old
    @PostMapping("/under")
    public ApiResponse<String> importExcelFileForUnder5YearsOld(@RequestParam("file") MultipartFile file) {
        try {
            fileService.saveDataForUnder5YearsOld(file, false);
            return ApiResponse.<String>builder()
                    .statusCode(HttpStatus.OK.value())
                    .message("Import file successfully")
                    .data("Import file successfully")
                    .build();
        } catch (Exception e) {
            return ApiResponse.<String>builder()
                    .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message("Import file failed")
                    .data("Import file failed")
                    .build();
        }
    }

    @PostMapping("/greater")
    public ResponseEntity<?> importExcelFileForGreaterThan5YearsOld(@RequestParam("file") MultipartFile file) {
        fileService.saveDataForUnder5YearsOld(file, true);
        return ResponseEntity.ok().build();
    }
}
