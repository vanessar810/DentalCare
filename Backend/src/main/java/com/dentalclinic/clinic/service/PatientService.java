package com.dentalclinic.clinic.service;

import com.dentalclinic.clinic.configuration.UserMapper;
import com.dentalclinic.clinic.dto.request.PatientByAdminRequestDTO;
import com.dentalclinic.clinic.dto.request.PatientRequestDto;
import com.dentalclinic.clinic.dto.response.PatientResponse2Dto;
import com.dentalclinic.clinic.dto.response.PatientResponseDto;
import com.dentalclinic.clinic.configuration.PatientMapper;
import com.dentalclinic.clinic.entity.*;
import com.dentalclinic.clinic.exception.ResourceNotFoundException;
import com.dentalclinic.clinic.repository.IPatientRepository;
import com.dentalclinic.clinic.repository.IUserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service

public class PatientService implements IPatientService{
    private IPatientRepository patientRepository;
    private IUserRepository userRepository;
    private ModelMapper modelMapper;
    private PatientMapper patientMapper;
    private final UserMapper userMapper;
    private PasswordEncoder passwordEncoder;

    public PatientService(IPatientRepository patientRepository, IUserRepository userRepository, ModelMapper modelMapper, PatientMapper patientMapper, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.patientMapper = patientMapper;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public PatientResponseDto createPatient(PatientByAdminRequestDTO patientRequestDto){
        User user = userMapper.userDtoToUser(patientRequestDto.getUser());
        user.setPassword(passwordEncoder.encode(patientRequestDto.getUser().getPassword()));
        userRepository.save(user);
        Patient patient = patientMapper.patientDTOtoPatient(patientRequestDto);
        patient.setUser(user);
        Patient patient2 = patientRepository.save(patient);
        return patientMapper.patientToPatientResponseDTOto(patient2);
    }
    @Transactional
    public PatientResponseDto createPatientProfile(PatientRequestDto patientRequestDto, String email){
        System.out.println("fecha de nacimiento: "+ patientRequestDto.getBirthDate());
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->new RuntimeException("User not found"));
        if (user.getUserRole() == UserRole.PATIENT){
            throw new IllegalStateException("User is already a patient.");
        }
        Patient patient1 = mapToEntity2(patientRequestDto);
        patient1.setUser(user);
        user.setUserRole(UserRole.PATIENT);
        Patient patient2 = patientRepository.save(patient1);
        userRepository.save(user);
        return mapToResponseDto(patient2);
    }

    public Optional<Patient> readId(Integer id){
        return  patientRepository.findById(id);
    }
    public List<Patient> readAll(){
        return patientRepository.findAll();
    }

    @Override
    public void update(Patient patient) {
        patientRepository.save(patient);
    }

    @Override
    public void delete(Integer id) throws ResourceNotFoundException {
        Optional<Patient> patientOptional = readId(id);
        if (patientOptional.isPresent()){
            patientRepository.deleteById(id);
        }
        else
            throw new ResourceNotFoundException("{\"message\":\"patient not found\"}");
    }
    public PatientResponse2Dto getPatientInfo(User user) throws ResourceNotFoundException {
        Patient patientOptional = patientRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("{\"message\":\"patient not found\"}"));

        return mapToResponseDto2(patientOptional);
    }
    public PatientResponseDto getProfile(User user) throws ResourceNotFoundException {
        Patient patientOptional = patientRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("{\"message\":\"patient not found\"}"));
        return mapToResponseDto(patientOptional);
    }

    private Patient mapToEntity2(PatientRequestDto patientRequestDto){
        Patient patient = modelMapper.map(patientRequestDto, Patient.class);
        patient.setBirthDate(patientRequestDto.getBirthDate());
        return  patient;

    }
    private PatientResponseDto mapToResponseDto(Patient patient){
        return modelMapper.map(patient, PatientResponseDto.class);
    }
    private PatientResponse2Dto mapToResponseDto2(Patient patient){
        return modelMapper.map(patient, PatientResponse2Dto.class);
    }

}
