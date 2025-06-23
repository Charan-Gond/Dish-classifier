package com.chr.Dish_classifier.exception;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalException {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handler(Exception e, WebRequest req){

        return new ResponseEntity<>(e.getMessage(), HttpStatusCode.valueOf(400));
    }
}
