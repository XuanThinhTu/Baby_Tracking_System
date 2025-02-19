package com.swd.project.service;

import com.swd.project.dto.response.StandardIndexResponse;

import java.util.List;

public interface IStandardIndexService {
    List<StandardIndexResponse> getALLStandardIndex();
}
