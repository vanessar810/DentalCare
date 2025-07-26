package com.dentalclinic.clinic.Dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AppointmentResponseDto {
  private Integer id;
  private OdontologistResponseDto odontologist;
  private PatientResponseDto patient;
  private String date;
}
