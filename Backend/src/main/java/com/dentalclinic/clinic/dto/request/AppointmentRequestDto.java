package com.dentalclinic.clinic.dto.request;

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
