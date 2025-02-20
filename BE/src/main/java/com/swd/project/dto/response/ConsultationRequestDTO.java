package com.swd.project.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.Date;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ConsultationRequestDTO {

    private int id;
    private String requestTitle;
    private Date requestDate;
    private int parentId;
    private String parentName;
    private Integer doctorId;
    private String doctorName;

}
