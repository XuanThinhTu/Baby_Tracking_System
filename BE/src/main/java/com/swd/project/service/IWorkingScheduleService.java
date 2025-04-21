package com.swd.project.service;

import com.swd.project.dto.request.WorkScheduleRequest;
import com.swd.project.dto.response.WorkingScheduleDTO;
import com.swd.project.enums.WorkingScheduleStatus;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IWorkingScheduleService {

    WorkingScheduleDTO registerWorkingSchedule(List<WorkScheduleRequest> requests);

    List<WorkingScheduleDTO> getSchedulesByStatus(WorkingScheduleStatus status);

    List<WorkingScheduleDTO> getDoctorSchedulesByStatus(WorkingScheduleStatus status,int doctorId);

    void submitWorkingSchedule(List<Integer> scheduleIds);

    void approveWorkingSchedule(List<Integer> scheduleIds);

    void rejectWorkingSchedule(List<Integer> scheduleIds);

    List<WorkingScheduleDTO> getAllApprovedSchedules();

    WorkingScheduleDTO updateWorkingSchedule(int scheduleId, int slotTimeId);

    void unsubmitWorkingSchedule(List<Integer> scheduleIds);
}
