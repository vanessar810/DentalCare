package com.dentalclinic.clinic.service;

import com.dentalclinic.clinic.dto.request.PatientByAdminRequestDTO;
import com.dentalclinic.clinic.dto.request.PatientRequestDto;
import com.dentalclinic.clinic.dto.response.PatientResponseDto;
import com.dentalclinic.clinic.entity.Address;
import com.dentalclinic.clinic.entity.Patient;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PatientServiceTest{
    private static Logger logger = LoggerFactory.getLogger(PatientServiceTest.class);
    @Autowired
    private PatientService patientService;
    private Patient patient;
    private PatientResponseDto patientResponseDto;
    private PatientRequestDto patientRequestDto;
    private PatientByAdminRequestDTO patientByAdminRequestDTO;
    @BeforeEach
    void setUp(){
        patient = new Patient();
        patient.setName("Alphonse");
        patient.setLastname("Dupont");
        patient.setDni("121212");
        patient.setInDate(LocalDate.of(2025,04,07));
        Address address = new Address();
        address.setStreet("Trois Frères");
        address.setNumber("58");
        address.setNeighborhood("Montmartre");
        patient.setAddress(address);
    }
//    @Test
//    @DisplayName("Create patient in DB")
//    void testPatientInDB(){
//        PatientResponseDto patientDB = patientService.createPatient(patientByAdminRequestDTO);
//        assertNotNull(patientDB);
//    }
//    @Test
//    @DisplayName("read patient by id")
//    void testPatientId(){
//        Integer id =1;
//        Optional<Patient> patientFound = patientService.readId(id);
//        Patient patient1 = patientFound.get();
//        assertEquals(id,patient1.getId());
//    }
//    @Test
//    @DisplayName("read all patient")
//    void testReadAllPatients(){
//        List<Patient>patients = patientService.readAll();
//        assertTrue(patients.size()!=0);
//    }
}