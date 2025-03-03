package com.swd.project.repository;

import com.swd.project.entity.Booking;
import com.swd.project.entity.SlotTime;
import com.swd.project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    boolean existsByDateAndDoctorAndSlotTime(LocalDate date, User doctor, SlotTime slotTime);


}
