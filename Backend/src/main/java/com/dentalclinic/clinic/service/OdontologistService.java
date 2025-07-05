package com.dentalclinic.clinic.service;

import com.dentalclinic.clinic.entity.Odontologist;
import com.dentalclinic.clinic.entity.Speciality;
import com.dentalclinic.clinic.exception.ResourceNotFoundException;
import com.dentalclinic.clinic.repository.IOdontologistRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OdontologistService implements IOdontologistService{
    private IOdontologistRepository odontologistRepository;
    private ISpecialityService specialityService;

    public OdontologistService(IOdontologistRepository odontologistRepository, ISpecialityService specialityService) {
        this.odontologistRepository = odontologistRepository;
        this.specialityService = specialityService;
    }

    public Odontologist createOdontologist(Odontologist odontologist) {

        return odontologistRepository.save(odontologist);
    }
    public Optional<Odontologist> readId(Integer id) throws ResourceNotFoundException {
        Optional<Odontologist> odontologist = odontologistRepository.findById(id);
        if (odontologist.isEmpty()) throw new ResourceNotFoundException("{\"message\":\"odontologist not found\"}");
            return odontologist;
    }

    public List<Odontologist> readAll() {

        return odontologistRepository.findAll();
    }

    @Override
    public void update(Odontologist odontologist) throws ResourceNotFoundException {
        Optional<Odontologist> odontologist1 = odontologistRepository.findById(odontologist.getId());
        odontologistRepository.save(odontologist);
        if (odontologist1.isEmpty()) {
            throw new ResourceNotFoundException("{\"message\":\"odontologist not found\"}");
        }
    }

    @Override
    public void delete(Integer id) throws ResourceNotFoundException {
        Optional<Odontologist> odontologistOptional = readId(id);
        if(odontologistOptional.isPresent()) {
            odontologistRepository.deleteById(id);
        }
        else
            throw new ResourceNotFoundException("{\"message\":\"odontologist not found\"}");
    }

    @Override
    public List<Odontologist> searchByLastname(String lastname)  throws ResourceNotFoundException{
        List<Odontologist> odontologists = odontologistRepository.searchByLastname(lastname);
        if (odontologists.isEmpty()) throw new ResourceNotFoundException("{\"message\":\"odontologist lastname not found\"}");
        return odontologists;

    }
    @Override
    public List<Odontologist> findByNameLike(String name){
        return odontologistRepository.findByNameLike(name);
    }
    //Add speciality
   public Odontologist addSpeciality(Integer id_odontologist, Integer id_speciality) throws ResourceNotFoundException {
        Optional<Odontologist> optionalOdontologist = readId(id_odontologist);
        if(optionalOdontologist.isEmpty()) throw new ResourceNotFoundException("{\"message\":\"odontologist not found\"}");
        Optional<Speciality> optionalSpeciality = specialityService.readId(id_speciality);
        if(optionalSpeciality.isEmpty()) throw new ResourceNotFoundException(("{\"message\":\"speciality not found\"}"));
        Odontologist odontologist = optionalOdontologist.get();
        odontologist.getSpecialities().add(optionalSpeciality.get());
        update(odontologist);
        return odontologist;
        }

}
