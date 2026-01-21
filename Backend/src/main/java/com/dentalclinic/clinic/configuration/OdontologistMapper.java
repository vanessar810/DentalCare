package com.dentalclinic.clinic.configuration;

import com.dentalclinic.clinic.dto.request.OdontologistRequestDTO;
import com.dentalclinic.clinic.dto.response.OdontologistResponseDto;
import com.dentalclinic.clinic.entity.Odontologist;

import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class},
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface OdontologistMapper {
    //Creates an Odontologist from Dto
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "name", source = "name")
    @Mapping(target = "lastname", source = "lastname")
    @Mapping(target = "email", source = "email")
    @Mapping(target = "phone", source = "phone")
    @Mapping(target = "license", source = "license")
    @Mapping(target = "inDate", ignore = true)
    @Mapping(target = "appointmentSet", ignore = true)
    @Mapping(target = "specialities", ignore = true)
    Odontologist odontologistDTOtoOdontologist(OdontologistRequestDTO odontologistRequestDTO);

    //Maps an OdontologistDto to Odontologist, to UPDATE it
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "inDate", ignore = true)
    @Mapping(target = "appointmentSet", ignore = true)
    @Mapping(target = "specialities", ignore = true)
    @Mapping(target = "user.name", source = "name", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)        // Maps directly to joined user
    @Mapping(target = "user.lastname", source = "lastname", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "user.email", source = "email", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "user.userRole", source = "role", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "phone", source = "phone", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "license", source = "license", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateOdontologistFromDTO (OdontologistRequestDTO dto, @MappingTarget Odontologist odontologist);

    @Mapping(source = "user.email", target = "email")
    @Mapping(source = "user.userRole", target = "role")
    OdontologistResponseDto odontologistToResponseDTO(Odontologist odontologist);
    List<OdontologistResponseDto> odontologistsToOdontologistResponseDtos(List<Odontologist> odontologists);

    @AfterMapping
    default void syncOdontologistWithUser(@MappingTarget Odontologist odontologist){
        if(odontologist.getUser() !=null){
            odontologist.setName(odontologist.getUser().getName());
            odontologist.setLastname(odontologist.getUser().getLastname());
        }
    }

}
