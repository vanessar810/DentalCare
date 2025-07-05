package com.dentalclinic.clinic.service;

import com.dentalclinic.clinic.entity.Odontologist;
import com.dentalclinic.clinic.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
@SpringBootTest
class OdontologistServiceTest {
    private static Logger logger = LoggerFactory.getLogger(OdontologistServiceTest.class);
@Autowired
private  OdontologistService odontologistService;
private Odontologist odontologist;
    @BeforeEach
    void setUp(){
        odontologist = new Odontologist();
        odontologist.setName("Leonard");
        odontologist.setLastname("Lambert");
        odontologist.setLicense("10002");
    }
    @Test
    @DisplayName("Create odont in DB")
    void testOdontDB(){
        Odontologist odontologist1 = odontologistService.createOdontologist(odontologist);
        assertNotNull(odontologist1);
    }
    @Test
    @DisplayName("read odont by Id")
    void testOdontId() throws ResourceNotFoundException {
     Integer id =1;
     Optional<Odontologist> odontFound = odontologistService.readId(id);
     Odontologist odontologist1 = odontFound.get();
        assertEquals(id,odontologist1.getId());
    }

    @Test
    @DisplayName("search all odont")
    void testSearchAllOdontDB(){
        List<Odontologist>odontologists = odontologistService.readAll();
        assertTrue(odontologists.size()!=0);
    }
}
