package com.swd.project.service.impl;

import com.swd.project.dto.response.NotificationDTO;
import com.swd.project.entity.Notification;
import com.swd.project.entity.User;
import com.swd.project.enums.NotificationType;
import com.swd.project.mapper.NotificationMapper;
import com.swd.project.repository.NotificationRepository;
import com.swd.project.repository.UserRepository;
import com.swd.project.service.INotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class NotificationService implements INotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final NotificationMapper notificationMapper;

    @Override
    public void sendNotification(int userId, String title, String message, NotificationType type) {
        User user = userRepository.findById(userId).get();
        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setRead(false);
        notification.setType(type);
        notification.setUser(user);
        notification.setCreatedAt(new Date(LocalDateTime.now().getNano()));
        notificationRepository.save(notification);
    }
}
