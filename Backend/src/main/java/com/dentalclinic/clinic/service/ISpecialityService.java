package com.dentalclinic.clinic.service;

import com.dentalclinic.clinic.entity.Odontologist;
import com.dentalclinic.clinic.entity.Speciality;
import com.dentalclinic.clinic.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface ISpecialityService {
    Speciality create(Speciality speciality);
    Optional<Speciality> readId(Integer id) throws ResourceNotFoundException;
    List<Speciality> readAll();
}
