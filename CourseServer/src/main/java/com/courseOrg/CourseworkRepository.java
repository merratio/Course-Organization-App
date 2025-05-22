package com.courseOrg;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;

@Repository
public interface CourseworkRepository extends JpaRepository<Coursework, Integer>{
	@Query("SELECT c FROM Coursework c WHERE c.userId = :userId AND c.moduleCode = :moduleCode")
	List<Coursework> findByUserAndModule(@Param("userId") int userId, @Param("moduleCode") String moduleCode);
	
	@Modifying
	@Transactional
	@Query("UPDATE Coursework c1 SET c1.gradeOutOf100 = :grade WHERE c1.courseId = :courseId")
	void updateGrade100(@Param("grade") int grade, @Param("courseId") int courseId);
	
	@Modifying
	@Transactional
	@Query("UPDATE Coursework c1 SET c1.gradeOutOfPercentage = :grade WHERE c1.courseId = :courseId")
	void updateGradePercentage(@Param("grade") int grade, @Param("courseId") int courseId);
}
