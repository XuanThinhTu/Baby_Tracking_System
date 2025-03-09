package com.swd.project.dto.request;

import com.swd.project.enums.SlotTimeShift;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SlotTimeCreationRequest {

    private String startTime;
    private String endTime;
    private SlotTimeShift shifts;
}
