package com.dentalclinic.clinic.Dto.response;

import lombok.*;

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
}
