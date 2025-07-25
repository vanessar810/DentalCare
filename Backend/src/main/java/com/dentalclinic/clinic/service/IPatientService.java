package com.dentalclinic.clinic.service;

import com.dentalclinic.clinic.Dto.request.PatientByAdminRequestDTO;
import com.dentalclinic.clinic.Dto.request.PatientRequestDto;
import com.dentalclinic.clinic.Dto.response.PatientResponse2Dto;
import com.dentalclinic.clinic.Dto.response.PatientResponseDto;
import com.dentalclinic.clinic.entity.Patient;
import com.dentalclinic.clinic.entity.User;
import com.dentalclinic.clinic.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface IPatientService {
     PatientResponseDto createPatient(PatientByAdminRequestDTO patientRequestDto);
     Optional<Patient> readId(Integer id);
     List<Patient> readAll();
     void update(Patient patient);
     void delete(Integer id) throws ResourceNotFoundException;
     PatientResponseDto createPatientProfile(PatientRequestDto patientRequestDto, String email);
    PatientResponse2Dto getPatientInfo(User user) throws ResourceNotFoundException;
     PatientResponseDto getProfile(User user) throws ResourceNotFoundException;
}
