package com.swd.project.service;

import org.springframework.web.multipart.MultipartFile;

public interface IFileService {

    void saveDataForUnder5YearsOld(MultipartFile file, boolean isGreaterFiveYearsOld);
}
