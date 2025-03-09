package com.swd.project.service;

import com.swd.project.dto.request.WorkScheduleRequest;
import com.swd.project.dto.response.WorkingScheduleDTO;
import com.swd.project.enums.WorkingScheduleStatus;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IWorkingScheduleService {

    WorkingScheduleDTO registerWorkingSchedule(List<WorkScheduleRequest> requests);

    Page<WorkingScheduleDTO> getSchedulesByStatus(WorkingScheduleStatus status, int page, int size);

    Page<WorkingScheduleDTO> getDoctorSchedulesByStatus(WorkingScheduleStatus status, int page, int size, int doctorId);

    void submitWorkingSchedule(List<Integer> scheduleIds);

}
