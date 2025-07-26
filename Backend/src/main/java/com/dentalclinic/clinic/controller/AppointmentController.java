package com.dentalclinic.clinic.controller;

import com.dentalclinic.clinic.dto.request.AppointmentRequestDto;
import com.dentalclinic.clinic.dto.response.AppointmentResponseDto;
import com.dentalclinic.clinic.exception.ResourceNotFoundException;
import com.dentalclinic.clinic.service.IAppointmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/v1/appointment")
public class AppointmentController {
    private IAppointmentService appointmentService;

    public AppointmentController(IAppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping
    public ResponseEntity<AppointmentResponseDto> createAppointment(@RequestBody AppointmentRequestDto appointment){
        AppointmentResponseDto appointment1 = appointmentService.create(appointment);
        if (appointment1 == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } else {
            return ResponseEntity.status(HttpStatus.CREATED).body(appointment1);
        }
    }
    @GetMapping
    public ResponseEntity<List<AppointmentResponseDto>> readAllAppointments(){
        return ResponseEntity.ok(appointmentService.readAll());
    }
    @PutMapping("/{id}")
    public ResponseEntity<String> updateAppointment(@PathVariable Integer id, @RequestBody AppointmentRequestDto appointment){
        appointmentService.update(id, appointment);
        return ResponseEntity.ok("{\"message\":\"Appointment updated\"}");
    }
    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    @GetMapping("/dates")
    public ResponseEntity<List<AppointmentResponseDto>> findDates(@RequestParam String start, @RequestParam String end){
        LocalDate startDate = LocalDate.parse(start, formatter);
        LocalDate endDate = LocalDate.parse(end, formatter);
        return ResponseEntity.ok(appointmentService.findByDates(startDate,endDate));
    }
    @GetMapping("/user")
    public ResponseEntity<List<AppointmentResponseDto>> findUser(@RequestParam Integer patientId){
        return ResponseEntity.ok(appointmentService.findByUserId(patientId));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable Integer id) throws ResourceNotFoundException{
        appointmentService.delete(id);
        return ResponseEntity.ok("{\"message\":\"appointment deleted\"}");
    }
}