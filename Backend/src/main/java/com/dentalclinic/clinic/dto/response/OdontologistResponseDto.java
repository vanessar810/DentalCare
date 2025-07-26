package com.dentalclinic.clinic.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OdontologistResponseDto {
    private Integer id;
    private String name;
    private String lastname;
    private String license;
    private String email;
    private String phone;
}
