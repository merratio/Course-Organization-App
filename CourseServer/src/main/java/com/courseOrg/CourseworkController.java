package com.courseOrg;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/coursework")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseworkController {
	@Autowired
	private CourseworkRepository repo;
	
	@GetMapping("")
	public List<Coursework> findAll(){
		return repo.findAll();
		
	}
	
	@GetMapping("/user/{userId}/module/{moduleCode}")
	public List<Coursework> findByUserandModule(@PathVariable int userId, @PathVariable String moduleCode){
		return repo.findByUserAndModule(userId, moduleCode);
		
	
	}
	

}
