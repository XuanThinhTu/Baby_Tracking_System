package com.swd.project.service;

import com.swd.project.dto.response.WorkingScheduleDTO;

public interface IWorkingScheduleService {

    WorkingScheduleDTO registerWorkingSchedule(String slotTimeId, String date);

}
