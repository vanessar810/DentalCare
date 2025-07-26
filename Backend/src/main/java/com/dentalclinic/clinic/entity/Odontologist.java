package com.dentalclinic.clinic.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name ="odontologists")
public class Odontologist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String lastname;
    private String license;
    private String email;
    private String phone;
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @CreationTimestamp
    private LocalDate inDate;

    @OneToMany(mappedBy = "odontologist", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Appointment> appointmentSet = new HashSet<>();

    @ManyToMany
        @JoinTable(name="specialities_odontologist",
                joinColumns = @JoinColumn(name = "odontologist_id"),
                inverseJoinColumns = @JoinColumn(name = "speciality_id"))
    Set<Speciality> specialities = new HashSet<>();
}
