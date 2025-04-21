package com.swd.project.service;

import com.swd.project.dto.response.NotificationDTO;
import com.swd.project.enums.NotificationType;

public interface INotificationService {

    void sendNotification(int userId, String title, String message, NotificationType type);
}
