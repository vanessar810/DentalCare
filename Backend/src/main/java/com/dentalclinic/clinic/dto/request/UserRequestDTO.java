package com.dentalclinic.clinic.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserRequestDTO {
    private String name;
    private String lastname;
    private String email;
    private String password;
    private String userRole;

}
