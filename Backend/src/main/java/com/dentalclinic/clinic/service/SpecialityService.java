package com.dentalclinic.clinic.service;

import com.dentalclinic.clinic.entity.Speciality;
import com.dentalclinic.clinic.exception.ResourceNotFoundException;
import com.dentalclinic.clinic.repository.ISpecialityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class SpecialityService implements ISpecialityService{
    private ISpecialityRepository specialityRepository;

    public SpecialityService(ISpecialityRepository specialityRepository) {
        this.specialityRepository = specialityRepository;
    }

    @Override
    public Speciality create(Speciality speciality) {
        return specialityRepository.save(speciality);
    }

    @Override
    public Optional<Speciality> readId(Integer id) throws ResourceNotFoundException {
       Optional<Speciality> specialityOptional = specialityRepository.findById(id);
       if(specialityOptional.isEmpty()) throw  new ResourceNotFoundException("{\"message\":\"speciality not found\"}");
        return specialityOptional;
    }

    @Override
    public List<Speciality> readAll() {
        return specialityRepository.findAll();
    }
}
