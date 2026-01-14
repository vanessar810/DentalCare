package com.dentalclinic.clinic.exception;

import com.dentalclinic.clinic.entity.Appointment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import com.dentalclinic.clinic.exception.EmailAlreadyUsedException;

@ControllerAdvice
public class GlobalException {
   @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> resourceNotFound(ResourceNotFoundException e){
       return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
      //return ResponseEntity.status(HttpStatus.valueOf(404)).body(e.getMessage());
   }
   @ExceptionHandler(EmailAlreadyUsedException.class)
    public ResponseEntity<String> handleEmailDuplicate(EmailAlreadyUsedException e){
       return  ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
   }
   @ExceptionHandler(AppointmentException.class)
    public  ResponseEntity<String> handleAppointments(AppointmentException e){
       return  ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
   }

}
