package com.dentalclinic.clinic.configuration;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper(){
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.addConverter(ctx -> LocalDate.parse(ctx.getSource()), String.class, LocalDate.class);
        return modelMapper;
    }
}
