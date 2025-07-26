package com.dentalclinic.clinic.service;

import com.dentalclinic.clinic.dto.request.OdontologistRequestDTO;
import com.dentalclinic.clinic.dto.response.OdontologistResponseDto;
import com.dentalclinic.clinic.configuration.OdontologistMapper;
import com.dentalclinic.clinic.configuration.UserMapper;
import com.dentalclinic.clinic.entity.Odontologist;
import com.dentalclinic.clinic.entity.Speciality;
import com.dentalclinic.clinic.entity.User;
import com.dentalclinic.clinic.exception.ResourceNotFoundException;
import com.dentalclinic.clinic.repository.IOdontologistRepository;
import com.dentalclinic.clinic.repository.IUserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OdontologistService implements IOdontologistService{
    private IOdontologistRepository odontologistRepository;
    private IUserRepository userRepository;
    private ISpecialityService specialityService;
    private OdontologistMapper odontologistMapper;
    private UserMapper userMapper;
    private PasswordEncoder passwordEncoder;

    public OdontologistService(IOdontologistRepository odontologistRepository, IUserRepository userRepository, ISpecialityService specialityService, OdontologistMapper odontologistMapper, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.odontologistRepository = odontologistRepository;
        this.userRepository = userRepository;
        this.specialityService = specialityService;
        this.odontologistMapper = odontologistMapper;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public OdontologistResponseDto createOdontologist(OdontologistRequestDTO odontologistRequestDTO) {
        User user = userMapper.userDtoToUser(odontologistRequestDTO.getUser());
        user.setPassword(passwordEncoder.encode(odontologistRequestDTO.getUser().getPassword()));
        userRepository.save(user);
        Odontologist odontologist = odontologistMapper.odontologistDTOtoOdontologist(odontologistRequestDTO);
        odontologist.setUser(user);
        Odontologist odontologist1 = odontologistRepository.save(odontologist);
        OdontologistResponseDto odontologistResponseDto = odontologistMapper.odontologistToResponseDTO(odontologist1);
        return odontologistResponseDto;
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
