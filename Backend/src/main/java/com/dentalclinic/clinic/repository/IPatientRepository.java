package com.dentalclinic.clinic.repository;

import com.dentalclinic.clinic.entity.Patient;
import com.dentalclinic.clinic.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IPatientRepository extends JpaRepository<Patient, Integer> {
    boolean existsByUser(User user);
    Optional<Patient> findByUser(User user);
}
