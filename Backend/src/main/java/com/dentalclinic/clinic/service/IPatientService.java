package com.dentalclinic.clinic.service;

import com.dentalclinic.clinic.Dto.request.PatientRequestDto;
import com.dentalclinic.clinic.Dto.response.PatientResponseDto;
import com.dentalclinic.clinic.entity.Patient;
import com.dentalclinic.clinic.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface IPatientService {
     PatientResponseDto createPatient(PatientRequestDto patientRequestDto);
     Optional<Patient> readId(Integer id);
     List<Patient> readAll();
     void update(Patient patient);
     void delete(Integer id) throws ResourceNotFoundException;
     PatientResponseDto createPatientProfile(PatientRequestDto patientRequestDto, String email);
}
