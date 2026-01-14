package com.dentalclinic.clinic.configuration;

import com.dentalclinic.clinic.dto.request.PatientByAdminRequestDTO;
import com.dentalclinic.clinic.dto.request.PatientRequestUpdateByAdminDTO;
import com.dentalclinic.clinic.dto.request.PatientRequestUpdateByPatientDTO;
import com.dentalclinic.clinic.dto.response.PatientResponseDto;
import com.dentalclinic.clinic.entity.Patient;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class, AddressMapper.class},
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface PatientMapper {
    //Maps PatientByAdmin to Patient to CREATE a patient
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

    //Maps a PatientDto from an ADMIN to PATIENT, to UPDATE a patient
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "inDate", ignore = true)
    @Mapping(target = "appointmentSet", ignore = true)
    @Mapping(target = "dni", source = "dni", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "birthDate", source = "birthDate",nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "address", source = "address", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "user.name", source = "name", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)        // Maps directly to joined user
    @Mapping(target = "user.lastname", source = "lastname", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "user.email", source = "email", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "user.userRole", source = "role", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updatePatientFromDto(PatientRequestUpdateByAdminDTO dto, @MappingTarget Patient patient);

    //Maps a PatientDto from a PATIENT to PATIENT, to UPDATE a patient
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "inDate", ignore = true)
    @Mapping(target = "appointmentSet", ignore = true)
    @Mapping(target = "dni", ignore = true)              // Ignorar campos que no están en el DTO
    @Mapping(target = "birthDate", ignore = true)
    @Mapping(target = "address", source = "address", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "user.name", source = "name", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "user.lastname", source = "lastname", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "user.email",ignore = true)
    @Mapping(target = "user.userRole", ignore = true)
    void updatePatientFromDto (PatientRequestUpdateByPatientDTO dto, @MappingTarget Patient patient);

    @Mapping(source = "user.email", target = "email")
    @Mapping(source = "user.userRole", target = "role")
    @Mapping(source = "address", target = "address")
    PatientResponseDto patientToPatientResponseDTOto(Patient patient);
    List<PatientResponseDto> patientsToPatientResponseDtos(List<Patient> patients);

    @AfterMapping
    default void syncPatientWithUser(@MappingTarget Patient patient) {
        if (patient.getUser() != null) {
            patient.setName(patient.getUser().getName());
            patient.setLastname(patient.getUser().getLastname());
        }
    }
}
