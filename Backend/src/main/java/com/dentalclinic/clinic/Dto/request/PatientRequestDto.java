package com.dentalclinic.clinic.Dto.request;

import com.dentalclinic.clinic.entity.Address;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PatientRequestDto {
    private String name;
    private String lastname;
    private String dni;
    private LocalDate inDate;
    private LocalDate BirthDate;
    private Address address;
}