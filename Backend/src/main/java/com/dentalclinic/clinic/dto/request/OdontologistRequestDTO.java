package com.dentalclinic.clinic.dto.request;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OdontologistRequestDTO {
    private String name;
    private String lastname;
    private String license;
    private String phone;
    private String email;
    private String role;
}
