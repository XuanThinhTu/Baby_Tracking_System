package com.swd.project.controller;

import com.swd.project.dto.response.ApiResponse;
import com.swd.project.dto.response.BookingAvailableResponse;
import com.swd.project.dto.response.BookingResponse;
import com.swd.project.service.impl.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/booking")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;

    @GetMapping("/available")
    public ResponseEntity<ApiResponse<BookingAvailableResponse>> getAllAvailableBookingsSchedule(@RequestParam YearMonth yearMonth) {
        return ResponseEntity.ok(
                ApiResponse.<BookingAvailableResponse>builder()
                        .message("Available bookings")
                        .data(bookingService.getAvailableBookingResponse(yearMonth))
                        .build()
        );
    }



    @GetMapping
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getAllBookings() {
        return ResponseEntity.ok(
                ApiResponse.<List<BookingResponse>>builder()
                        .message("List all bookings")
                        .data(bookingService.getAllBookings())
                        .build()
        );
    }

    @PutMapping("/{bookingId}/cancel")
    public ResponseEntity<ApiResponse<?>> cancelBooking(@PathVariable Integer bookingId) {
        bookingService.cancelBooking(bookingId);
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .message("Booking with id: " + bookingId + " cancled successfully")
                        .build()
        );
    }


}
