package com.dentalclinic.clinic.Dto.response;

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
}
