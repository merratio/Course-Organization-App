package com.courseOrg;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ModuleRepository extends JpaRepository<Module, String>{
	@Query("SELECT m FROM Module m WHERE m.userId = :userId")
	List<Module> findByUid(@Param("userId")int userId);

}
