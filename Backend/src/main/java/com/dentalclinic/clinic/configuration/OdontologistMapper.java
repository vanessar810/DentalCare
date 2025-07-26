package com.dentalclinic.clinic.configuration;

import com.dentalclinic.clinic.dto.request.OdontologistRequestDTO;
import com.dentalclinic.clinic.dto.response.OdontologistResponseDto;
import com.dentalclinic.clinic.entity.Odontologist;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = UserMapper.class)
public interface OdontologistMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", source = "user")
    @Mapping(target = "name", source = "user.name")
    @Mapping(target = "lastname", source = "user.lastname")
    @Mapping(target = "email", source = "email")
    @Mapping(target = "phone", source = "phone")
    @Mapping(target = "license", source = "license")
    @Mapping(target = "inDate", ignore = true)
    @Mapping(target = "appointmentSet", ignore = true)
    @Mapping(target = "specialities", ignore = true)

    Odontologist odontologistDTOtoOdontologist(OdontologistRequestDTO odontologistRequestDTO);

    OdontologistResponseDto odontologistToResponseDTO(Odontologist odontologist);
}
