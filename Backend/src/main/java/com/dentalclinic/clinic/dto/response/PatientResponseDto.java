package com.dentalclinic.clinic.dto.response;

import com.dentalclinic.clinic.dto.request.AddressDto;
import com.dentalclinic.clinic.entity.Address;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PatientResponseDto {
    private Integer id;
    private String name;
    private String lastname;
    private String dni;
    private LocalDate birthDate;
    private AddressDto address;
    private String email;
    private String role;

}
