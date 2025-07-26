package com.dentalclinic.clinic.service;

import com.dentalclinic.clinic.dto.request.AppointmentRequestDto;
import com.dentalclinic.clinic.dto.response.AppointmentResponseDto;
import com.dentalclinic.clinic.dto.response.OdontologistResponseDto;
import com.dentalclinic.clinic.dto.response.PatientResponseDto;
import com.dentalclinic.clinic.entity.Appointment;
import com.dentalclinic.clinic.entity.Odontologist;
import com.dentalclinic.clinic.entity.Patient;
import com.dentalclinic.clinic.exception.ResourceNotFoundException;
import com.dentalclinic.clinic.repository.IAppointmentRepository;
import com.dentalclinic.clinic.repository.IOdontologistRepository;
import com.dentalclinic.clinic.repository.IPatientRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService implements IAppointmentService{
    private IAppointmentRepository appointmentRepository;
    private IPatientRepository patientRepository;
    private IOdontologistRepository odontologistRepository;
    private ModelMapper modelMapper;

    public AppointmentService(IAppointmentRepository appointmentRepository, IPatientRepository patientRepository, IOdontologistRepository odontologistRepository, ModelMapper modelMapper) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.odontologistRepository = odontologistRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public AppointmentResponseDto create(AppointmentRequestDto appointmentRequestDto) {
        Optional<Patient> patient = patientRepository.findById(appointmentRequestDto.getPatient_id());
        Optional<Odontologist> odontologist = odontologistRepository.findById(appointmentRequestDto.getOdontologist_id());
        Appointment appointment1 = new Appointment();
        Appointment appointment2 = null;
        AppointmentResponseDto appointmentResponseDto = null;
        if (patient.isPresent()&& odontologist.isPresent()){
            appointment1.setDate(LocalDate.parse(appointmentRequestDto.getDate()));
            appointment1.setPatient(patient.get());
            appointment1.setOdontologist(odontologist.get());
            appointment2=appointmentRepository.save(appointment1);
            appointmentResponseDto = mapToResponseDto(appointment2);
        }
        return appointmentResponseDto;
    }

    @Override
    public AppointmentResponseDto readId(Integer id) {
        Optional<Appointment> appointmentOptional = appointmentRepository.findById(id);
        if (appointmentOptional.isPresent()){
            Appointment appointment1 = appointmentOptional.get();
            AppointmentResponseDto appointmentResponseDto = mapToResponseDto(appointment1);
            return appointmentResponseDto;
        }
        return null;
    }

    @Override
    public List<AppointmentResponseDto> readAll() {
        List<Appointment> appointments = appointmentRepository.findAll();
        List<AppointmentResponseDto> appointments1 = new ArrayList<>();
        AppointmentResponseDto appointment2 = null;
        for (Appointment appointment: appointments){
            appointment2 = mapToResponseDto(appointment);
            appointments1.add(appointment2);
        }
        return appointments1;
    }
    @Override
    public void update(Integer id, AppointmentRequestDto appointmentRequestDto) {
        Optional<Patient> patient = patientRepository.findById(appointmentRequestDto.getPatient_id());
        Optional<Odontologist> odontologist = odontologistRepository.findById(appointmentRequestDto.getOdontologist_id());
        Optional<Appointment> appointment =appointmentRepository.findById(id);
        Appointment appointment1 = new Appointment();
        if (patient.isPresent() && odontologist.isPresent() && appointment.isPresent()){
            appointment1.setId(id);
            appointment1.setDate(LocalDate.parse(appointmentRequestDto.getDate()));
            appointment1.setPatient(patient.get());
            appointment1.setOdontologist(odontologist.get());
            appointmentRepository.save(appointment1);
        }
    }

    @Override
    public void delete(Integer id) throws ResourceNotFoundException {
        AppointmentResponseDto appointmentOptional = readId(id);
        if (appointmentOptional != null) {
            appointmentRepository.deleteById(id);
        } else
            throw new ResourceNotFoundException("{\"message\":\"appointment not found\"}");
    }

    @Override
    public List<AppointmentResponseDto> findByDates(LocalDate startDate, LocalDate endDate) {
        List<Appointment> appointments = appointmentRepository.findByDates(startDate, endDate);
        List<AppointmentResponseDto> appointmentsDto = new ArrayList<>();
        AppointmentResponseDto appointmentResponseDto = null;
        for (Appointment appointment: appointments){
            appointmentResponseDto = mapToResponseDto(appointment);
            appointmentsDto.add(appointmentResponseDto);
        }
        return appointmentsDto;
    }

    @Override
    public List<AppointmentResponseDto> findByUserId(Integer patientId) {
        List<Appointment> appointments = appointmentRepository.findByUserId(patientId);
        List<AppointmentResponseDto> appointmentsDto = new ArrayList<>();
        AppointmentResponseDto appointmentResponseDto = null;
        for (Appointment appointment: appointments){
            appointmentResponseDto = mapToResponseDto(appointment);
            appointmentsDto.add(appointmentResponseDto);
        }
        return appointmentsDto;
    }

    private AppointmentResponseDto mapToResponseDto(Appointment appointment){
        AppointmentResponseDto appointmentResponseDto = modelMapper.map(appointment,AppointmentResponseDto.class);
        appointmentResponseDto.setOdontologist(modelMapper.map(appointment.getOdontologist(), OdontologistResponseDto.class));
        appointmentResponseDto.setPatient(modelMapper.map(appointment.getPatient(), PatientResponseDto.class));
        return appointmentResponseDto;
    }
}
