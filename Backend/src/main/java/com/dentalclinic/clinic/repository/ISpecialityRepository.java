package com.dentalclinic.clinic.repository;

import com.dentalclinic.clinic.entity.Speciality;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ISpecialityRepository extends JpaRepository <Speciality, Integer> {

}
