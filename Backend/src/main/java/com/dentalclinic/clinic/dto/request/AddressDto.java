package com.dentalclinic.clinic.Dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AddressDto {
    private String street;
    private int number;
    private String neighborhood;
}
