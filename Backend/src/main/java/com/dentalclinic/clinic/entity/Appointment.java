package com.dentalclinic.clinic.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
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
     LocalDate date;
    @ManyToOne
     Patient patient;
    @ManyToOne
     Odontologist odontologist;
}
