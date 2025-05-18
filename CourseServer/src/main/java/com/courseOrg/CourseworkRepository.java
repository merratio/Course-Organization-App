package com.courseOrg;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseworkRepository extends JpaRepository<Coursework, Integer>{
	@Query("SELECT c FROM Coursework c WHERE c.userId = :userId AND c.moduleCode = :moduleCode")
	List<Coursework> findByUserAndModule(@Param("userId") int userId, @Param("moduleCode") String moduleCode);
	

}
