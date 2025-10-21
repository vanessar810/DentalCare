package com.dentalclinic.clinic.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name ="appointments")
public class Appointment {
    @Id
            @GeneratedValue(strategy = GenerationType.IDENTITY)
     Integer id;
    LocalDateTime date;
    @ManyToOne
     Patient patient;
    @ManyToOne
     Odontologist odontologist;
}
