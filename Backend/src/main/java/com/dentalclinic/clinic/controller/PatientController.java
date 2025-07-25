package com.dentalclinic.clinic.controller;

import com.dentalclinic.clinic.dto.request.PatientByAdminRequestDTO;
import com.dentalclinic.clinic.dto.request.PatientRequestDto;
import com.dentalclinic.clinic.dto.response.PatientResponse2Dto;
import com.dentalclinic.clinic.dto.response.PatientResponseDto;
import com.dentalclinic.clinic.entity.Patient;
import com.dentalclinic.clinic.entity.User;
import com.dentalclinic.clinic.exception.ResourceNotFoundException;
import com.dentalclinic.clinic.service.IPatientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/patient")
public class PatientController {
    public IPatientService patientService;

    public PatientController(IPatientService patientService) {
        this.patientService = patientService;
    }
    // 🛡 Endpoint solo para ADMIN
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<PatientResponseDto> createPatient(@RequestBody PatientByAdminRequestDTO patient){
        PatientResponseDto patient1 = patientService.createPatient(patient);
        return ResponseEntity.status(HttpStatus.CREATED).body(patient1);
    }
    // 👤 Endpoint para usuarios autenticados que completan su perfil
    @PostMapping("/profile")
    public  ResponseEntity<PatientResponseDto> createProfile(
            @RequestBody PatientRequestDto patientRequestDto,
            @AuthenticationPrincipal User user
    ){
        PatientResponseDto patientResponseDto = patientService.createPatientProfile(patientRequestDto, user.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(patientResponseDto);
    }


    @GetMapping
    public ResponseEntity<List<Patient>> readAll(){
         return ResponseEntity.ok(patientService.readAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Patient> readById(@PathVariable Integer id){
        Optional<Patient> patient = patientService.readId(id);
        if (patient.isPresent()){
            Patient patient1 = patient.get();
            return ResponseEntity.ok(patient1);
        }else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    @PutMapping
    public ResponseEntity<String> updatePatient(@RequestBody Patient patient){
       Optional<Patient> patient1 = patientService.readId(patient.getId());
       if (patient1.isPresent()){
           patientService.update(patient);
           return ResponseEntity.ok("{\"message\":\"patient updated\"}");
       } else {
           return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
       }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePatient(@PathVariable Integer id) throws ResourceNotFoundException {
            patientService.delete(id);
            return ResponseEntity.ok("{\"message\":\"patient deleted\"}");
    }
    @GetMapping("/me")
    public ResponseEntity<PatientResponse2Dto> getMyInfo(@AuthenticationPrincipal User user) throws ResourceNotFoundException {
        PatientResponse2Dto patientResponse2Dto = patientService.getPatientInfo(user);
        return ResponseEntity.ok(patientResponse2Dto);
    }
    @GetMapping("/profile")
    public ResponseEntity<PatientResponseDto> getProfile(@AuthenticationPrincipal User user) throws ResourceNotFoundException {
        PatientResponseDto patientResponseDto = patientService.getProfile(user);
        return ResponseEntity.ok(patientResponseDto);
    }

}
