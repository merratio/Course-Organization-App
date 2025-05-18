package com.courseOrg;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;



@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	@Query("Select u from User u where u.email = :email")
	Optional<User> findByEmail(@Param("email") String email);
	

}
