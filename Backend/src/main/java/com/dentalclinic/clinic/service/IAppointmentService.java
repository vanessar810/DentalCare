package com.dentalclinic.clinic.service;

import com.dentalclinic.clinic.dto.request.AppointmentRequestDto;
import com.dentalclinic.clinic.dto.response.AppointmentResponseDto;
import com.dentalclinic.clinic.exception.ResourceNotFoundException;


import java.time.LocalDate;
import java.util.List;

public interface IAppointmentService {
    AppointmentResponseDto create(AppointmentRequestDto appointmentRequestDto);
    AppointmentResponseDto readId(Integer id);
    List<AppointmentResponseDto> readAll();
    void update(Integer id,AppointmentRequestDto appointmentRequestDto);
    void delete (Integer id)  throws ResourceNotFoundException;
    //HQL
    List<AppointmentResponseDto> findByDates(LocalDate startDate, LocalDate endDate);
    List<AppointmentResponseDto> findByUserId(Integer patientId);
}
