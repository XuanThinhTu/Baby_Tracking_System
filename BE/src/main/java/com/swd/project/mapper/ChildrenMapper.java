package com.swd.project.mapper;

import com.swd.project.dto.response.ChildrenDTO;
import com.swd.project.entity.Children;
import org.springframework.stereotype.Component;

@Component
public class ChildrenMapper {

    public ChildrenDTO toChildrenDTO(Children children) {
        return ChildrenDTO.builder()
                .id(children.getId())
                .name(children.getName())
                .birthDate(children.getBirthDate())
                .gender(children.getGender())
                .parentId(children.getUser().getId())
                .parentName(children.getUser().getFirstName() + " " + children.getUser().getLastName())
                .build();
    }
}
