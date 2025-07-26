package com.dentalclinic.clinic.Dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AppointmentRequestDto {
  private Integer patient_id;
  private Integer odontologist_id;
  private  String date;

}
