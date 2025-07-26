package com.dentalclinic.clinic.configuration;

import com.dentalclinic.clinic.dto.request.UserRequestDTO;
import com.dentalclinic.clinic.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "id", ignore = true)
    User userDtoToUser(UserRequestDTO dto);
}