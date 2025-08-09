package com.dentalclinic.clinic.configuration;

import com.dentalclinic.clinic.dto.request.AddressDto;
import com.dentalclinic.clinic.entity.Address;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
@Mapper(componentModel = "spring")
public interface AddressMapper {
    Address addressDtoToAddress(AddressDto addressDto);

    @Mapping(target = "id", ignore = true)
    void updateAddressFromDto(AddressDto addressDto, @MappingTarget Address address);

    AddressDto addressToDto(Address address);
}
