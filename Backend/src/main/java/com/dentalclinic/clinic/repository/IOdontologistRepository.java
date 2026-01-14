package com.dentalclinic.clinic.repository;

import com.dentalclinic.clinic.entity.Odontologist;
import com.dentalclinic.clinic.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

public interface IOdontologistRepository extends JpaRepository<Odontologist, Integer> {
    @Query("Select o from Odontologist o where LOWER(o.lastname) = LOWER(?1)")
    List<Odontologist> searchByLastname (@Param("lastname") String lastname);

    @Query("Select o from Odontologist o where LOWER(o.name) LIKE LOWER(CONCAT('%',:name,'%'))")
    List<Odontologist> findByNameLike(@Param("name") String name);
    Optional<Odontologist> findByUser(User user);
}
