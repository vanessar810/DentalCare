package com.dentalclinic.clinic.dto.request;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
//To Update patient from Admin role
public class PatientRequestUpdateByAdminDTO {
    private String name;
    private String lastname;
    private String dni;
    private LocalDate birthDate;
    private AddressDto address;
    private String email;
    private String role;
}
