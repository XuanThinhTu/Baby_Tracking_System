package com.swd.project.service;

import com.swd.project.dto.request.SlotTimeCreationRequest;
import com.swd.project.dto.response.SlotTimeDTO;

import java.util.List;

public interface ISlotTimeService {

    SlotTimeDTO addSlotTime(SlotTimeCreationRequest request);

    List<SlotTimeDTO> getAllSlotTimes();
}
