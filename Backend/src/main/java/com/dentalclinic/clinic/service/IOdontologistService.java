package com.dentalclinic.clinic.service;

import com.dentalclinic.clinic.dto.request.OdontologistRequestDTO;
import com.dentalclinic.clinic.dto.response.OdontologistResponseDto;
import com.dentalclinic.clinic.entity.Odontologist;
import com.dentalclinic.clinic.entity.User;
import com.dentalclinic.clinic.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface IOdontologistService {
    OdontologistResponseDto createOdontologist(OdontologistRequestDTO odontologistRequestDTO);
    OdontologistResponseDto readId(Integer id);
    List<OdontologistResponseDto> readAll();
    OdontologistResponseDto update(Integer id, OdontologistRequestDTO odontologist);
    void delete(Integer id) throws ResourceNotFoundException;
    // HQL methods
    List<OdontologistResponseDto> searchByLastname (String lastname) throws ResourceNotFoundException;
    List<OdontologistResponseDto> findByNameLike (String name);

    OdontologistResponseDto addSpeciality(Integer idOdontologist, Integer idSpeciality) throws ResourceNotFoundException;

    OdontologistResponseDto getOdontologistInfo(User user);
}
