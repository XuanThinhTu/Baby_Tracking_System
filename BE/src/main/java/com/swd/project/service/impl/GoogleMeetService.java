package com.swd.project.service.impl;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.CalendarScopes;
import com.google.api.services.calendar.model.*;
import com.swd.project.entity.User;

import java.io.FileInputStream;
import java.util.Arrays;
import java.util.Collections;
import java.util.UUID;

public class GoogleMeetService {
    private static final String APPLICATION_NAME = "BabyTrackingSys";
    private static final JacksonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    // Đường dẫn tới file credentials của Service Account
    private static final String CREDENTIALS_FILE_PATH = "src/main/resources/credentials.json";

    /**
     * Tạo và trả về đối tượng Calendar đã được xác thực.
     */
    private static Calendar getCalendarService() throws Exception {
        GoogleCredential credential = GoogleCredential.fromStream(new FileInputStream(CREDENTIALS_FILE_PATH))
                .createScoped(Collections.singleton(CalendarScopes.CALENDAR));
        return new Calendar.Builder(GoogleNetHttpTransport.newTrustedTransport(), JSON_FACTORY, credential)
                .setApplicationName(APPLICATION_NAME)
                .build();
    }

    /**
     * Tạo sự kiện trên Google Calendar với conferenceData (Google Meet) và trả về link Google Meet.
     */
    public static String generateGoogleMeetLink(User member, User doctor) {
        try {
            Calendar service = getCalendarService();

            // Tạo đối tượng Event
            Event event = new Event()
                    .setSummary("Cuộc họp tư vấn Booking")
                    .setDescription("Cuộc họp trực tuyến cho lịch booking của hệ thống");

            // Thời gian bắt đầu: hiện tại; thời gian kết thúc: sau 30 phút
            DateTime startDateTime = new DateTime(System.currentTimeMillis());
            EventDateTime start = new EventDateTime()
                    .setDateTime(startDateTime)
                    .setTimeZone("Asia/Ho_Chi_Minh");
            event.setStart(start);

            DateTime endDateTime = new DateTime(System.currentTimeMillis() + 30 * 60 * 1000);
            EventDateTime end = new EventDateTime()
                    .setDateTime(endDateTime)
                    .setTimeZone("Asia/Ho_Chi_Minh");
            event.setEnd(end);

            EventAttendee[] attendees = new EventAttendee[] {
                    new EventAttendee().setEmail(member.getEmail()),
                    new EventAttendee().setEmail(doctor.getEmail()),
                    new EventAttendee().setEmail("babytrackingsys@gmail.com")
            };
            event.setAttendees(Arrays.asList(attendees));

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
            return "https://meet.google.com/fallback-link1";
        } catch (Exception e) {
            e.printStackTrace();
            return "https://meet.google.com/fallback-link2";
        }
    }
}
