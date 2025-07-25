package com.dentalclinic.clinic.configuration;

import com.dentalclinic.clinic.Dto.request.PatientByAdminRequestDTO;
import com.dentalclinic.clinic.Dto.request.UserRequestDTO;

import com.dentalclinic.clinic.entity.Patient;
import com.dentalclinic.clinic.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PatientMapper {
    //Maps UserRequestDTO to User
    @Mapping(source = "userRole", target = "userRole")
    User userDtoToUser(UserRequestDTO dto);

    //Maps PatientByAdmin to Patient
    @Mapping(target = "name", source = "user.name")
    @Mapping(target = "lastname", source = "user.lastname")
    Patient patientDTOtoPatient(PatientByAdminRequestDTO dto);
}
