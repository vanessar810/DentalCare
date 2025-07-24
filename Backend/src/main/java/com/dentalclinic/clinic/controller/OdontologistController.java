package com.dentalclinic.clinic.controller;

import com.dentalclinic.clinic.entity.Odontologist;
import com.dentalclinic.clinic.exception.ResourceNotFoundException;
import com.dentalclinic.clinic.service.IOdontologistService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/odontologist")
public class OdontologistController {
    private IOdontologistService odontologistService;

    public OdontologistController(IOdontologistService odontologistService) {
        this.odontologistService = odontologistService;
    }

    @PostMapping
    public ResponseEntity<Odontologist> createOdontologist(@RequestBody Odontologist odontologist) {
        return ResponseEntity.status(HttpStatus.CREATED).body(odontologistService.createOdontologist(odontologist));
    }

    @PutMapping
    public ResponseEntity<String> updateOdontologist(@RequestBody Odontologist odontologist) throws ResourceNotFoundException {
        Optional<Odontologist> odontologist1 = odontologistService.readId(odontologist.getId());
            return ResponseEntity.ok("{\"message\":\"odontologist updated\"}");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Odontologist> serachId(@PathVariable Integer id) throws ResourceNotFoundException{
        Optional<Odontologist> odontologist = odontologistService.readId(id);
            return ResponseEntity.ok(odontologist.get());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOdontologist(@PathVariable Integer id) throws ResourceNotFoundException {
            odontologistService.delete(id);
            return ResponseEntity.ok("{\"message\":\"odontologist deleted\"}");
    }
    @GetMapping
    public ResponseEntity<List<Odontologist>> searchAll(){
        return ResponseEntity.ok(odontologistService.readAll());
    }

    @GetMapping("/lastname/{lastname}")
    public ResponseEntity<List<Odontologist>> searchByLastname(@PathVariable String lastname) throws ResourceNotFoundException {
        return ResponseEntity.ok(odontologistService.searchByLastname(lastname));
    }
    @GetMapping("/name/{name}")
    public ResponseEntity<List<Odontologist>> findByNameLike(@PathVariable String name){
        return ResponseEntity.ok(odontologistService.findByNameLike(name));
    }
    @PutMapping("/{id_odontologist}/speciality/{id_speciality}")
    public ResponseEntity<Odontologist> addSpeciality(@PathVariable Integer id_odontologist, @PathVariable Integer id_speciality) throws ResourceNotFoundException {
       return ResponseEntity.ok(odontologistService.addSpeciality(id_odontologist, id_speciality));
    }

}
