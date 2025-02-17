package com.swd.project.controller;

import com.swd.project.dto.request.GrowTrackerRequest;
import com.swd.project.dto.response.ApiResponse;
import com.swd.project.service.Impl.GrowthTrackerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/grow-tracker")
@RequiredArgsConstructor
public class GrowthTrackerController {

    private final GrowthTrackerService growTrackerService;

    @GetMapping("/{childId}")
    public ResponseEntity<ApiResponse<?>> getAllGrowTrackerData(@PathVariable int childId) {
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .statusCode(200)
                        .message("List of id: " + childId + " tracking data")
                        .data(growTrackerService.showAllGrowthTracker(childId))
                        .build()
        );
    }

    @PostMapping("/{childId}")
    public ResponseEntity<ApiResponse<?>> AddGrowTrackerData(@PathVariable int childId, @RequestBody GrowTrackerRequest growTrackerRequest) {
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Tracking data added successfully")
                        .data(growTrackerService.addGrowthTracker(childId, growTrackerRequest))
                        .build()
        );
    }

    @PutMapping("/tracker/{id}")
    public ResponseEntity<ApiResponse<?>> updateGrowTrackerData(@PathVariable int id, @RequestBody GrowTrackerRequest growTrackerRequest) {
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Tracking data with id " + id + " added successfully")
                        .data(growTrackerService.updateGrowthTracker(id, growTrackerRequest))
                        .build()
        );
    }

    @DeleteMapping("/tracker/{id}")
    public ResponseEntity<ApiResponse<?>> deleteGrowTrackerData(@PathVariable int id) {
        growTrackerService.deleteGrowthTracker(id);
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .statusCode(HttpStatus.OK.value())
                        .message("Tracking data with id: " + id + " deleted successfully")
                        .build()
        );
    }

}
