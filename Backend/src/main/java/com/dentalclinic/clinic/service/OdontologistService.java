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
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
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
    public OdontologistResponseDto readId(Integer id) {
        Odontologist odontologist = odontologistRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("id not found"+id));
            return odontologistMapper.odontologistToResponseDTO(odontologist);
    }

    public List<OdontologistResponseDto> readAll() {
        return odontologistMapper.odontologistsToOdontologistResponseDtos(odontologistRepository.findAll());
    }

    @Override
    public OdontologistResponseDto update(Integer id, OdontologistRequestDTO odontologistDto){
        Odontologist existingOdontologist1 = odontologistRepository.findById(id)
                        .orElseThrow(()-> new ResourceNotFoundException("Odontologist not found "+id));
        odontologistMapper.updateOdontologistFromDTO(odontologistDto, existingOdontologist1);
        Odontologist savedOdontologist = odontologistRepository.save(existingOdontologist1);
        return odontologistMapper.odontologistToResponseDTO(savedOdontologist);
    }

    @Override
    public void delete(Integer id) {
        Odontologist odontologist = odontologistRepository.findById(id)
            .orElseThrow(()->new ResourceNotFoundException("odontologist not found with id:"+id));
        odontologistRepository.delete(odontologist);
        log.info("odontologist with id {} has been delated successfully", id);
    }

    @Override
    public List<OdontologistResponseDto> searchByLastname(String lastname) {
        List<Odontologist> odontologists = odontologistRepository.searchByLastname(lastname);
        if (odontologists.isEmpty()) throw new ResourceNotFoundException("{\"message\":\"odontologist lastname not found: \"}"+ lastname);
        return odontologistMapper.odontologistsToOdontologistResponseDtos(odontologists);

    }
    @Override
    public List<OdontologistResponseDto> findByNameLike(String name){
        List<Odontologist> odontologists = odontologistRepository.findByNameLike(name);
        if (odontologists.isEmpty()) throw new ResourceNotFoundException("{\"message\":\"odontologist name not found: \"}"+ name);
        return odontologistMapper.odontologistsToOdontologistResponseDtos(odontologists);
    }
    //Add speciality
   public OdontologistResponseDto addSpeciality(Integer id_odontologist, Integer id_speciality) throws ResourceNotFoundException {
       Odontologist odontologist = odontologistRepository.findById(id_odontologist)
               .orElseThrow(()->new ResourceNotFoundException("{\"message\":\"odontologist not found\"}"));
        Optional<Speciality> optionalSpeciality = specialityService.readId(id_speciality);
        if(optionalSpeciality.isEmpty()) throw new ResourceNotFoundException(("{\"message\":\"speciality not found\"}"));
        odontologist.getSpecialities().add(optionalSpeciality.get());
        odontologistRepository.save(odontologist);
        OdontologistResponseDto odontologist1 = odontologistMapper.odontologistToResponseDTO(odontologist);
        return odontologist1;
        }

}
