package com.swd.project.service.Impl;

import com.swd.project.entity.BmiStandard;
import com.swd.project.enums.PeriodType;
import com.swd.project.repository.BmiStandardsRepository;
import com.swd.project.service.IFileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileService implements IFileService {

    private final BmiStandardsRepository bmiStandardsRepository;
    //under 5 years old
    private final String BMI_FOR_AGE = "bfa";
    private final String HEAD_CIRCUMFERENCE_FOR_AGE = "hcfa";
    private final String LENGTH_HEIGHT_FOR_AGE = "lhfa";
    private final String WEIGHT_FOR_AGE = "wfa"; // WEIGHT_FOR_AGE_5_TO_19
    //greater than 5 years old
    private final String BMI_FOR_AGE_5_TO_19 = "bmi";
    private final String HEIGHT_FOR_AGE_5_TO_19 = "hfa";

    @Override
    public void saveDataForUnder5YearsOld(MultipartFile file, boolean isGreaterFiveYearsOld) {

        try {
            String fileName = file.getOriginalFilename();
            String dataType = fileName.substring(0, fileName.indexOf("-"));
            String gender = fileName.substring(fileName.indexOf("-") + 1, fileName.indexOf("-") + 5);
            InputStream inputStream = file.getInputStream();
            Workbook workbook = new XSSFWorkbook(inputStream);
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();

            if(!rows.hasNext()){
                throw new RuntimeException("File is empty");
            }
            //Read the header row
            Row headerRow = rows.next();
            Map<String, Integer> columnIndexMap = new HashMap<>();
            for (Cell cell: headerRow){
                columnIndexMap.put(cell.getStringCellValue(), cell.getColumnIndex());
            }
            // Required column names
            List<String> requiredColumns = Arrays.asList(
                    "Day", "SD4neg", "SD3neg", "SD2neg", "SD1neg", "SD0", "SD1", "SD2", "SD3", "SD4"
            );
            //Validate if all required columns exist
            for(String column : requiredColumns){
                if(!columnIndexMap.containsKey(column)){
                    throw new RuntimeException("Missing column: " + column);
                }
            }
            List<BmiStandard> bmiStandards = new ArrayList<>();
            while(rows.hasNext()){
                Row row = rows.next();
                BmiStandard bmiStandard = new BmiStandard();
                bmiStandard.setGender(gender);
                bmiStandard.setPeriod(getIntegerCellValue(row.getCell(isGreaterFiveYearsOld ? columnIndexMap.get("Month") : columnIndexMap.get("Day"))));
                bmiStandard.setPeriodType(isGreaterFiveYearsOld ? PeriodType.MONTH : PeriodType.DAY);
                switch (dataType) {
                    case WEIGHT_FOR_AGE -> {
                        bmiStandard.setWeightNeg4Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD4neg"))));
                        bmiStandard.setWeightNeg3Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD3neg"))));
                        bmiStandard.setWeightNeg2Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD2neg"))));
                        bmiStandard.setWeightNeg1Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD1neg"))));
                        bmiStandard.setWeightMedian(getNumericCellValue(row.getCell(columnIndexMap.get("SD0"))));
                        bmiStandard.setWeightPos1Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD1"))));
                        bmiStandard.setWeightPos2Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD2"))));
                        bmiStandard.setWeightPos3Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD3"))));
                        bmiStandard.setWeightPos4Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD4"))));
                    }
                    case LENGTH_HEIGHT_FOR_AGE, HEIGHT_FOR_AGE_5_TO_19 -> {
                        bmiStandard.setHeightNeg4Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD4neg"))));
                        bmiStandard.setHeightNeg3Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD3neg"))));
                        bmiStandard.setHeightNeg2Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD2neg"))));
                        bmiStandard.setHeightNeg1Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD1neg"))));
                        bmiStandard.setHeightMedian(getNumericCellValue(row.getCell(columnIndexMap.get("SD0"))));
                        bmiStandard.setHeightPos1Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD1"))));
                        bmiStandard.setHeightPos2Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD2"))));
                        bmiStandard.setHeightPos3Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD3"))));
                        bmiStandard.setHeightPos4Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD4"))));
                    } case HEAD_CIRCUMFERENCE_FOR_AGE -> {
                        bmiStandard.setHeadCircumferenceNeg4Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD4neg"))));
                        bmiStandard.setHeadCircumferenceNeg3Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD3neg"))));
                        bmiStandard.setHeadCircumferenceNeg2Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD2neg"))));
                        bmiStandard.setHeadCircumferenceNeg1Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD1neg"))));
                        bmiStandard.setHeadCircumferenceMedian(getNumericCellValue(row.getCell(columnIndexMap.get("SD0"))));
                        bmiStandard.setHeadCircumferencePos1Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD1"))));
                        bmiStandard.setHeadCircumferencePos2Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD2"))));
                        bmiStandard.setHeadCircumferencePos3Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD3"))));
                        bmiStandard.setHeadCircumferencePos4Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD4"))));
                    }
                    case BMI_FOR_AGE, BMI_FOR_AGE_5_TO_19 -> {
                        bmiStandard.setBmiNeg4Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD4neg"))));
                        bmiStandard.setBmiNeg3Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD3neg"))));
                        bmiStandard.setBmiNeg2Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD2neg"))));
                        bmiStandard.setBmiNeg1Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD1neg"))));
                        bmiStandard.setBmiMedian(getNumericCellValue(row.getCell(columnIndexMap.get("SD0"))));
                        bmiStandard.setBmiPos1Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD1"))));
                        bmiStandard.setBmiPos2Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD2"))));
                        bmiStandard.setBmiPos3Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD3"))));
                        bmiStandard.setBmiPos4Sd(getNumericCellValue(row.getCell(columnIndexMap.get("SD4"))));
                    }
                }
                bmiStandards.add(bmiStandard);
            }
            bmiStandardsRepository.saveAll(bmiStandards);
            workbook.close();

        }catch (Exception e){
            throw new RuntimeException("Failed to import data: " + e.getMessage());
        }
    }

    private Integer getIntegerCellValue(Cell cell) {
        if (cell == null) return null;
        if (cell.getCellType() == CellType.NUMERIC) {
            return (int) cell.getNumericCellValue(); // Convert double to int
        } else if (cell.getCellType() == CellType.STRING) {
            try {
                return Integer.parseInt(cell.getStringCellValue().trim()); // Convert string to int
            } catch (NumberFormatException e) {
                return null; // Handle invalid values
            }
        }
        return null;
    }

    private Double getNumericCellValue(Cell cell) {
        return (cell != null && cell.getCellType() == CellType.NUMERIC) ? cell.getNumericCellValue() : null;
    }
}
