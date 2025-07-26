package com.dentalclinic.clinic.configuration;

import com.dentalclinic.clinic.dto.request.PatientByAdminRequestDTO;
import com.dentalclinic.clinic.dto.request.UserRequestDTO;

import com.dentalclinic.clinic.dto.response.PatientResponseDto;
import com.dentalclinic.clinic.entity.Patient;
import com.dentalclinic.clinic.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = UserMapper.class)
public interface PatientMapper {
    //Maps PatientByAdmin to Patient
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", source = "user")
    @Mapping(target = "name", source = "user.name")
    @Mapping(target = "lastname", source = "user.lastname")
    @Mapping(target = "dni", source = "dni")
    @Mapping(target = "birthDate", source = "birthDate")
    @Mapping(target = "address", source = "address")
    @Mapping(target = "inDate", ignore = true)
    @Mapping(target = "appointmentSet", ignore = true)
    Patient patientDTOtoPatient(PatientByAdminRequestDTO dto);

    PatientResponseDto patientToPatientResponseDTOto(Patient patient);
}
