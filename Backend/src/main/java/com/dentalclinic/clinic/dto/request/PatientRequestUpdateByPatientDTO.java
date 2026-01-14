package com.dentalclinic.clinic.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
//To Update patient from patient role
public class PatientRequestUpdateByPatientDTO {
    private String name;
    private String lastname;
    private AddressDto address;
}
