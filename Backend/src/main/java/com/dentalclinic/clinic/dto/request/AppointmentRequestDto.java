package com.dentalclinic.clinic.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AppointmentRequestDto {
  private Integer patient_id;
  private Integer odontologist_id;
  private LocalDateTime date;
}
