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
    private String email;
    private String phone;
    private UserRequestDTO user;
}
