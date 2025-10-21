package com.dentalclinic.clinic.configuration;

import com.dentalclinic.clinic.dto.request.AppointmentRequestDto;
import com.dentalclinic.clinic.entity.Appointment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", uses = {UserMapper.class, AddressMapper.class},
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AppointmentMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "date", source = "date")
    @Mapping(target = "patient.id", source = "patient_id")
    @Mapping(target = "odontologist.id", source = "odontologist_id")
    Appointment appointmentDTOtoAppoinment(AppointmentRequestDto dto);
}
