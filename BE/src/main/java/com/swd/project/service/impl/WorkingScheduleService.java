package com.swd.project.service.impl;

import com.swd.project.dto.response.WorkingScheduleDTO;
import com.swd.project.entity.SlotTime;
import com.swd.project.entity.User;
import com.swd.project.entity.WorkingSchedule;
import com.swd.project.enums.WorkingScheduleStatus;
import com.swd.project.exception.ResourceNotFoundException;
import com.swd.project.mapper.WorkingScheduleMapper;
import com.swd.project.repository.SlotTimeRepository;
import com.swd.project.repository.WorkingScheduleRepository;
import com.swd.project.service.IUserService;
import com.swd.project.service.IWorkingScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class WorkingScheduleService implements IWorkingScheduleService {

    private final WorkingScheduleRepository workingScheduleRepository;
    private final WorkingScheduleMapper workingScheduleMapper;
    private final SlotTimeRepository slotTimeRepository;
    private final IUserService userService;

    @Override
    public WorkingScheduleDTO registerWorkingSchedule(String slotTimeId, String date) {
        User user = userService.getAuthenticatedUser();
        SlotTime slotTime = slotTimeRepository.findById(Integer.parseInt(slotTimeId))
                .orElseThrow(() -> new ResourceNotFoundException("Slot time not found"));
        WorkingSchedule workingSchedule = new WorkingSchedule();
        workingSchedule.setSlotTime(slotTime);
        workingSchedule.setDate(LocalDate.parse(date));
        workingSchedule.setStatus(WorkingScheduleStatus.ACTIVE);
        workingSchedule.setDoctor(user);
        workingSchedule = workingScheduleRepository.save(workingSchedule);
        return workingScheduleMapper.toWorkingScheduleDTO(workingSchedule);
    }
}
