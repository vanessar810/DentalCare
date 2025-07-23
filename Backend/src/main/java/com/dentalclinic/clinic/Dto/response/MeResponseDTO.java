package com.dentalclinic.clinic.Dto.response;

import com.dentalclinic.clinic.entity.UserRole;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MeResponseDTO {
    private String name;
    private String email;
    private boolean hasPatientProfile;
    private UserRole role;
}
