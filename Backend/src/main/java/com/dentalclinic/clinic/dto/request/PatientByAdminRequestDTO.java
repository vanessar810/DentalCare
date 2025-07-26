package com.dentalclinic.clinic.dto.request;
import com.dentalclinic.clinic.entity.Address;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PatientByAdminRequestDTO {
    private String name;
    private String lastname;
    private String dni;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate birthDate;
    private Address address;
    private UserRequestDTO user;
}
