package com.swd.project.service;

import com.swd.project.dto.request.GrowTrackerRequest;
import com.swd.project.dto.response.GrowthTrackerResponse;
import com.swd.project.entity.GrowthTracker;

import java.util.List;

public interface IGrowthTrackerService {
    GrowthTrackerResponse addGrowthTracker(int childId, GrowTrackerRequest growTrackerRequest);
    GrowthTrackerResponse updateGrowthTracker(int id, GrowTrackerRequest growTrackerRequest);
    void deleteGrowthTracker(int id);
    List<GrowthTrackerResponse> showAllGrowthTracker(int childId);
}
