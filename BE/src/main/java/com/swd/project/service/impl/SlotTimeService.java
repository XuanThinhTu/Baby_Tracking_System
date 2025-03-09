package com.swd.project.service.impl;

import com.swd.project.dto.request.SlotTimeCreationRequest;
import com.swd.project.dto.response.SlotTimeDTO;
import com.swd.project.entity.SlotTime;
import com.swd.project.enums.SlotTimeShift;
import com.swd.project.mapper.SlotTimeMapper;
import com.swd.project.repository.SlotTimeRepository;
import com.swd.project.service.ISlotTimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SlotTimeService implements ISlotTimeService {

    private final SlotTimeRepository slotTimeRepository;
    private final SlotTimeMapper slotTimeMapper;

    @Override
    public SlotTimeDTO addSlotTime(SlotTimeCreationRequest request) {
        LocalTime startTime = LocalTime.parse(request.getStartTime());
        LocalTime endTime = LocalTime.parse(request.getEndTime());
        if(slotTimeRepository.findByStartTimeAndEndTime(startTime, endTime).isPresent()){
            throw new RuntimeException("Slot time already exists");
        }
        if(endTime.isBefore(startTime)){
            throw new RuntimeException("End time must be after start time");
        }
        SlotTime slotTime = new SlotTime();
        slotTime.setStartTime(startTime);
        slotTime.setEndTime(endTime);

        switch (request.getShifts()){
            case SlotTimeShift.MORNING -> slotTime.setShifts(SlotTimeShift.MORNING);
            case SlotTimeShift.AFTERNOON -> slotTime.setShifts(SlotTimeShift.AFTERNOON);
            case SlotTimeShift.EVENING -> slotTime.setShifts(SlotTimeShift.EVENING);
            default -> throw new RuntimeException("Invalid shifts");
        }

        slotTimeRepository.save(slotTime);
        return slotTimeMapper.toSlotTimeDTO(slotTime);
    }

    @Override
    public List<SlotTimeDTO> getAllSlotTimes() {
        List<SlotTime> slotTimes = slotTimeRepository.findAll();
        return slotTimes.stream().map(slotTimeMapper::toSlotTimeDTO).toList();
    }
}
