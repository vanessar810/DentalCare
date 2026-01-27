package com.dentalclinic.clinic.configuration;

import com.dentalclinic.clinic.dto.request.AppointmentRequestDto;
import com.dentalclinic.clinic.dto.response.AppointmentResponseDto;
import com.dentalclinic.clinic.dto.response.PatientResponseDto;
import com.dentalclinic.clinic.entity.Appointment;
import com.dentalclinic.clinic.entity.Patient;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", uses = {UserMapper.class, AddressMapper.class,  PatientMapper.class, OdontologistMapper.class},
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AppointmentMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "date", source = "date")
    @Mapping(target = "patient.id", source = "patient_id")
    @Mapping(target = "odontologist.id", source = "odontologist_id")
    Appointment appointmentDTOtoAppoinment(AppointmentRequestDto dto);

    @Mapping(source = "date", target = "date")
    @Mapping(source = "patient", target = "patient")
    @Mapping(source = "odontologist", target = "odontologist")
    AppointmentResponseDto appointmentToAppointmentResponseDTOto(Appointment appointment);
}
