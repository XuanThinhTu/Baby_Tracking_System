package com.swd.project.dto.request;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SlotTimeCreationRequest {

    private String startTime;
    private String endTime;
}
