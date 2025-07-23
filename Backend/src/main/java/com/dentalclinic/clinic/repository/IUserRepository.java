package com.dentalclinic.clinic.repository;

import com.dentalclinic.clinic.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface IUserRepository  extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail (String email);
}
