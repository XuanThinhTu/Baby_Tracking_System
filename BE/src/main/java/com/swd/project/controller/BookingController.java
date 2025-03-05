package com.swd.project.controller;

import com.swd.project.dto.request.CreateBookingNoteRequest;
import com.swd.project.dto.response.ApiResponse;
import com.swd.project.dto.response.BookingAvailableResponse;
import com.swd.project.dto.response.BookingResponse;
import com.swd.project.service.impl.BookingService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

    @PostMapping("/{childId}")
    public ResponseEntity<ApiResponse<?>> createBookingSchedule(
            @PathVariable int childId,
            @RequestParam LocalDate date,
            @RequestParam int slotTimeId,
            @RequestBody CreateBookingNoteRequest note
    ) throws MessagingException {
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .message("Booking schedule")
                        .data(bookingService.createBooking(childId, date, slotTimeId, note.note()))
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
