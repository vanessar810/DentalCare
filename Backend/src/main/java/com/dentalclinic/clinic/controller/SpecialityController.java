package com.dentalclinic.clinic.controller;

import com.dentalclinic.clinic.entity.Odontologist;
import com.dentalclinic.clinic.entity.Speciality;
import com.dentalclinic.clinic.service.ISpecialityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/speciality")
public class SpecialityController {
    private ISpecialityService specialityService;

    public SpecialityController(ISpecialityService specialityService) {
        this.specialityService = specialityService;
    }
    @PostMapping
    public ResponseEntity<Speciality> create (@RequestBody Speciality speciality){
        return ResponseEntity.ok(specialityService.create(speciality));
    }
    @GetMapping
    public ResponseEntity<List<Speciality>> searchAll(){
        return ResponseEntity.ok(specialityService.readAll());
    }

}
