package com.swd.project.exception;

public class OutOfPermissionException extends RuntimeException{

    public OutOfPermissionException(String message) {
        super(message);
    }
}
