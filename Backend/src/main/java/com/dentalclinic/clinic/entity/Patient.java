package com.dentalclinic.clinic.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name ="patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String lastname;
    private String dni;
    private LocalDate inDate;
    private LocalDate BirthDate;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;
    @OneToMany(mappedBy = "patient",  cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Appointment> appointmentSet = new HashSet<>();
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}


