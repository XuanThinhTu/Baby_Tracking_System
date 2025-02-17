package com.swd.project.service.Impl;

import com.swd.project.dto.request.GrowTrackerRequest;
import com.swd.project.dto.response.GrowthTrackerResponse;
import com.swd.project.entity.Children;
import com.swd.project.entity.GrowthTracker;
import com.swd.project.exception.ResourceNotFoundException;
import com.swd.project.mapper.GrowthTrackerMapper;
import com.swd.project.repository.ChildrenRepository;
import com.swd.project.repository.GrowthTrackerRepository;
import com.swd.project.service.IGrowthTrackerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GrowthTrackerService implements IGrowthTrackerService {

    private final GrowthTrackerRepository growthTrackerRepository;

    private final GrowthTrackerMapper growthTrackerMapper;

    private final ChildrenRepository childrenRepository;

    @Override
    public GrowthTrackerResponse addGrowthTracker(int childId ,GrowTrackerRequest growTrackerRequest) {
        GrowthTracker growthTracker = new GrowthTracker();
        growthTracker.setWeight(growTrackerRequest.weight());
        growthTracker.setHeight(growTrackerRequest.height());
        growthTracker.setHeadCircumference(growTrackerRequest.headCircumference());
        // Tính BMI với đơn vị chuyển đổi đúng
        double weightKg = growTrackerRequest.weight() / 1000.0;
        double heightM = growTrackerRequest.height() / 100.0;
        double bmi = weightKg / (heightM * heightM);

        // Làm tròn BMI về 2 chữ số thập phân
        double bmiRounded = Math.round(bmi * 100.0) / 100.0;
        growthTracker.setBmi(bmiRounded);
        growthTracker.setMeasuredAt(Date.valueOf(growTrackerRequest.measuredAt()));
        Children children = childrenRepository.findById(childId).orElseThrow(() -> new ResourceNotFoundException("Children id: " + childId + " not found"));
        growthTracker.setChildren(children);
        growthTrackerRepository.save(growthTracker);
        return growthTrackerMapper.toDto(growthTracker);
    }

    @Override
    public GrowthTrackerResponse updateGrowthTracker(int id, GrowTrackerRequest growTrackerRequest) {
        GrowthTracker growthTracker = growthTrackerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Growth Tracker id: " + id + " not found"));
        growthTracker.setWeight(growTrackerRequest.weight());
        growthTracker.setHeight(growTrackerRequest.height());
        growthTracker.setHeadCircumference(growTrackerRequest.headCircumference());
        growthTracker.setBmi((growTrackerRequest.weight()/1000)/((growTrackerRequest.height()/100)*(growTrackerRequest.height()/100)));
//        growthTracker.setMeasuredAt(new Date());
        growthTrackerRepository.save(growthTracker);
        return growthTrackerMapper.toDto(growthTracker);
    }

    @Override
    public void deleteGrowthTracker(int id) {
        GrowthTracker growthTracker = growthTrackerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Growth Tracker id: " + id + " not found"));
        growthTracker.setDeleted(true);
        growthTrackerRepository.save(growthTracker);
    }

    @Override
    public List<GrowthTrackerResponse> showAllGrowthTracker(int childId) {
        Children children = childrenRepository.findById(childId).orElseThrow(() -> new ResourceNotFoundException("Children id: " + childId + " not found"));
        return growthTrackerRepository.findAllByChildrenIdAndDeletedFalse(childId)
                .stream()
                .map(growthTrackerMapper::toDto)
                .collect(Collectors.toList());
    }
}
