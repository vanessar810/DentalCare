package com.dentalclinic.clinic.service;

import com.dentalclinic.clinic.dto.request.PatientByAdminRequestDTO;
import com.dentalclinic.clinic.dto.request.PatientRequestDto;
import com.dentalclinic.clinic.dto.request.PatientRequestUpdateByAdminDTO;
import com.dentalclinic.clinic.dto.request.PatientRequestUpdateByPatientDTO;
import com.dentalclinic.clinic.dto.response.PatientResponse2Dto;
import com.dentalclinic.clinic.dto.response.PatientResponseDto;
import com.dentalclinic.clinic.entity.Patient;
import com.dentalclinic.clinic.entity.User;
import com.dentalclinic.clinic.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface IPatientService {
    PatientResponseDto createPatient(PatientByAdminRequestDTO patientRequestDto);

    PatientResponseDto readId(Integer id);

    Patient findEntityById(Integer id);

    List<PatientResponseDto> readAll();

    PatientResponseDto updateByPatient(User user, PatientRequestUpdateByPatientDTO patientDto);

    PatientResponseDto updateByAdmin(Integer id, PatientRequestUpdateByAdminDTO patientDto);

    void delete(Integer id) throws ResourceNotFoundException;

    PatientResponseDto createPatientProfile(PatientRequestDto patientRequestDto, String email);

    PatientResponse2Dto getPatientInfo(User user) throws ResourceNotFoundException;

    PatientResponseDto getProfile(User user) throws ResourceNotFoundException;
}
