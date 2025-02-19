package com.swd.project.service.Impl;

import com.swd.project.dto.response.StandardIndexResponse;
import com.swd.project.mapper.StandardIndexMapper;
import com.swd.project.repository.BmiStandardsRepository;
import com.swd.project.service.IStandardIndexService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StandardIndexService implements IStandardIndexService {

    private final BmiStandardsRepository bmiStandardsRepository;

    private final StandardIndexMapper standardIndexMapper;

    @Override
    public List<StandardIndexResponse> getALLStandardIndex() {

        return bmiStandardsRepository.findAll()
                .stream()
                .map(standardIndexMapper::toDto)
                .collect(Collectors.toList());
    }
}
