package com.dentalclinic.clinic.dto.response;

import com.dentalclinic.clinic.entity.Address;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PatientResponse2Dto {
    private String name;
    private String lastname;
    private String dni;
    private LocalDate birthDate;
    private Address address;
}
