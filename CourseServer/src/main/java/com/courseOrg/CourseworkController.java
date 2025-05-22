package com.courseOrg;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
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
	
	@GetMapping("/{id}")
	public Coursework findById(@PathVariable int id){
		Optional<Coursework> cw = repo.findById(id);
		return cw.get();
		
	}
	
	@GetMapping("/user/{userId}/module/{moduleCode}")
	public List<Coursework> findByUserandModule(@PathVariable int userId, @PathVariable String moduleCode){
		return repo.findByUserAndModule(userId, moduleCode);
		
	}
	
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("")
	public void create(@RequestBody Coursework cw) {
		repo.save(cw);
		
	}
	
	@PutMapping("/{id}")
	public void updateGrade100(@PathVariable int id, @RequestBody int grade) {
		repo.updateGrade100(grade, id);
	}
	
	@PutMapping("/percent/{id}")
	public void updateGradePercentage(@PathVariable int id, @RequestBody int grade) {
		repo.updateGradePercentage(grade, id);
	}
	
	

}
