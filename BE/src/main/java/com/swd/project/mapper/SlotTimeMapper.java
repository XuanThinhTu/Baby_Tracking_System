package com.swd.project.mapper;

import com.swd.project.dto.response.SlotTimeDTO;
import com.swd.project.entity.SlotTime;
import org.springframework.stereotype.Component;

@Component
public class SlotTimeMapper {

    public SlotTimeDTO toSlotTimeDTO(SlotTime slotTime) {
        return SlotTimeDTO.builder()
                .id(slotTime.getId())
                .startTime(slotTime.getStartTime())
                .endTime(slotTime.getEndTime())
                .build();
    }
}
