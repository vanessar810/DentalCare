package com.dentalclinic.clinic.service;

import com.dentalclinic.clinic.Dto.request.PatientRequestDto;
import com.dentalclinic.clinic.Dto.response.AppointmentResponseDto;
import com.dentalclinic.clinic.Dto.response.OdontologistResponseDto;
import com.dentalclinic.clinic.Dto.response.PatientResponseDto;
import com.dentalclinic.clinic.entity.Appointment;
import com.dentalclinic.clinic.entity.Patient;
import com.dentalclinic.clinic.exception.ResourceNotFoundException;
import com.dentalclinic.clinic.repository.IPatientRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService implements IPatientService{
    private IPatientRepository patientRepository;
    private ModelMapper modelMapper;

    public PatientService(IPatientRepository patientRepository, ModelMapper modelMapper) {
        this.patientRepository = patientRepository;
        this.modelMapper = modelMapper;
    }

    public PatientResponseDto createPatient(PatientRequestDto patientRequestDto){
        Patient patient1 = mapToEntity(patientRequestDto);
        Patient patient2 = patientRepository.save(patient1);
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
    private Patient mapToEntity(PatientRequestDto patientRequestDto){
        return  modelMapper.map(patientRequestDto,Patient.class);
    }
    private PatientResponseDto mapToResponseDto(Patient patient){
        return modelMapper.map(patient, PatientResponseDto.class);
    }

}
