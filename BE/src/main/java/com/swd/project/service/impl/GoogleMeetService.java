package com.swd.project.service.impl;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.CalendarScopes;
import com.google.api.services.calendar.model.*;
import com.swd.project.entity.SlotTime;
import com.swd.project.entity.User;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.Collections;
import java.util.UUID;

import static com.swd.project.config.GoogleMeetConfig.JSON_FACTORY;
import static com.swd.project.config.GoogleMeetConfig.APPLICATION_NAME;
import static com.swd.project.config.GoogleMeetConfig.getCredentials;

@Service
public class GoogleMeetService {
//    private static final String APPLICATION_NAME = "BabyTrackingSys";
//    private static final JacksonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
//    // Đường dẫn tới file credentials của Service Account
//    private static final String CREDENTIALS_FILE_PATH = "src/main/resources/credentials.json";
//
//    /**
//     * Tạo và trả về đối tượng Calendar đã được xác thực.
//     */
//    private static Calendar getCalendarService() throws Exception {
//        GoogleCredential credential = GoogleCredential.fromStream(new FileInputStream(CREDENTIALS_FILE_PATH))
//                .createScoped(Collections.singleton(CalendarScopes.CALENDAR));
//        return new Calendar.Builder(GoogleNetHttpTransport.newTrustedTransport(), JSON_FACTORY, credential)
//                .setApplicationName(APPLICATION_NAME)
//                .build();
//    }

    /**
     * Tạo sự kiện trên Google Calendar với conferenceData (Google Meet) và trả về link Google Meet.
     */
    public String generateGoogleMeetLink(User member, User doctor, LocalDate bookingDate, SlotTime bookingSlotTime) {
        try {

            final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
            Calendar service =
                    new Calendar.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
                            .setApplicationName(APPLICATION_NAME)
                            .build();

            // Tạo đối tượng Event
            Event event = new Event()
                    .setSummary("Cuộc họp tư vấn Booking")
                    .setDescription("Cuộc họp trực tuyến cho lịch booking của hệ thống");

            // Thời gian bắt đầu: hiện tại; thời gian kết thúc: sau 30 phút

            LocalDateTime startLDT = LocalDateTime.of(bookingDate, bookingSlotTime.getStartTime());
            LocalDateTime endLDT = LocalDateTime.of(bookingDate, bookingSlotTime.getEndTime());

            DateTime startDateTime = new DateTime(java.util.Date.from(startLDT.atZone(ZoneId.systemDefault()).toInstant()));
            DateTime endDateTime = new DateTime(java.util.Date.from(endLDT.atZone(ZoneId.systemDefault()).toInstant()));

//            DateTime startDateTime = new DateTime(System.currentTimeMillis());
            EventDateTime start = new EventDateTime()
                    .setDateTime(startDateTime)
                    .setTimeZone("Asia/Ho_Chi_Minh");
            event.setStart(start);

//            DateTime endDateTime = new DateTime(System.currentTimeMillis() + 30 * 60 * 1000);
            EventDateTime end = new EventDateTime()
                    .setDateTime(endDateTime)
                    .setTimeZone("Asia/Ho_Chi_Minh");
            event.setEnd(end);

//            String[] recurrence = new String[] {"RRULE:FREQ=DAILY;COUNT=2"};
//            event.setRecurrence(Arrays.asList(recurrence));

            EventAttendee[] attendees = new EventAttendee[] {
                    new EventAttendee().setEmail(member.getEmail()),
                    new EventAttendee().setEmail(doctor.getEmail())
            };
            event.setAttendees(Arrays.asList(attendees));

            EventReminder[] reminderOverrides = new EventReminder[] {
                    new EventReminder().setMethod("email").setMinutes(24 * 60),
                    new EventReminder().setMethod("popup").setMinutes(10),
            };
            Event.Reminders reminders = new Event.Reminders()
                    .setUseDefault(false)
                    .setOverrides(Arrays.asList(reminderOverrides));
            event.setReminders(reminders);

//            String calendarId = "primary";
//            event = service.events().insert(calendarId, event).execute();

//            System.out.printf("Event created: %s\n", event.getHtmlLink());
//            return event.getHtmlLink();
//

            // Thiết lập yêu cầu tạo conference (Google Meet)
            CreateConferenceRequest createConferenceRequest = new CreateConferenceRequest();
            createConferenceRequest.setRequestId(UUID.randomUUID().toString());
            ConferenceData conferenceData = new ConferenceData();
            conferenceData.setCreateRequest(createConferenceRequest);
            event.setConferenceData(conferenceData);

            // Chèn sự kiện vào lịch. Lưu ý: "primary" là calendar mặc định của người dùng.
            Event createdEvent = service.events().insert("primary", event)
                    .setConferenceDataVersion(1)
                    .execute();

            // Lấy Google Meet link từ các EntryPoint trong conferenceData
            if (createdEvent.getConferenceData() != null && createdEvent.getConferenceData().getEntryPoints() != null) {
                for (EntryPoint entry : createdEvent.getConferenceData().getEntryPoints()) {
                    if ("video".equals(entry.getEntryPointType())) {
                        return entry.getUri();
                    }
                }
            }
            // Nếu không tìm thấy, trả về một link dự phòng
            return "https://meet.google.com/cdr-unpt-bhi";
        } catch (Exception e) {
            e.printStackTrace();
            return "https://meet.google.com/cdr-unpt-bhi";
        }
    }
}
