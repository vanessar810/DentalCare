package com.dentalclinic.clinic.controller;

import com.dentalclinic.clinic.dto.request.OdontologistRequestDTO;
import com.dentalclinic.clinic.dto.response.OdontologistResponseDto;
import com.dentalclinic.clinic.dto.response.PatientResponseDto;
import com.dentalclinic.clinic.entity.Odontologist;
import com.dentalclinic.clinic.exception.ResourceNotFoundException;
import com.dentalclinic.clinic.service.IOdontologistService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<OdontologistResponseDto> createOdontologist(@RequestBody OdontologistRequestDTO odontologistRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(odontologistService.createOdontologist(odontologistRequestDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OdontologistResponseDto> updateOdontologist(
            @PathVariable Integer id,
            @RequestBody OdontologistRequestDTO odontologist) {
        OdontologistResponseDto odontologist1 = odontologistService.update(id, odontologist);
            return ResponseEntity.ok(odontologist1);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OdontologistResponseDto> serachId(@PathVariable Integer id){
        OdontologistResponseDto odontologist = odontologistService.readId(id);
            return ResponseEntity.ok(odontologist);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOdontologist(@PathVariable Integer id) throws ResourceNotFoundException {
            odontologistService.delete(id);
            return ResponseEntity.ok("{\"message\":\"odontologist deleted\"}");
    }
    @GetMapping
    public ResponseEntity<List<OdontologistResponseDto>> searchAll(){
        return ResponseEntity.ok(odontologistService.readAll());
    }

    @GetMapping("/lastname/{lastname}")
    public ResponseEntity<List<OdontologistResponseDto>> searchByLastname(@PathVariable String lastname) throws ResourceNotFoundException {
        return ResponseEntity.ok(odontologistService.searchByLastname(lastname));
    }
    @GetMapping("/name/{name}")
    public ResponseEntity<List<OdontologistResponseDto>> findByNameLike(@PathVariable String name){
        return ResponseEntity.ok(odontologistService.findByNameLike(name));
    }
    @PutMapping("/{id_odontologist}/speciality/{id_speciality}")
    public ResponseEntity<OdontologistResponseDto> addSpeciality(@PathVariable Integer id_odontologist, @PathVariable Integer id_speciality) throws ResourceNotFoundException {
       return ResponseEntity.ok(odontologistService.addSpeciality(id_odontologist, id_speciality));
    }

}
