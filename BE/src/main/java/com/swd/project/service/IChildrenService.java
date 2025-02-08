package com.swd.project.service;

import com.swd.project.dto.response.ChildrenDTO;

import java.util.List;

public interface IChildrenService {

    ChildrenDTO addChildren(String name, String birthDate, String gender);

    ChildrenDTO getChildrenById(int id);

    List<ChildrenDTO> getChildrenByParentId(int parentId);
}
