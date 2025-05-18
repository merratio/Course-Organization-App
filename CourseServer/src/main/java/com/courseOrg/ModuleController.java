package com.courseOrg;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/modules")
@CrossOrigin(origins= "http://localhost:5173")
public class ModuleController {
	@Autowired
	private ModuleRepository repo;
	
	
	@GetMapping("")
	List<Module> findAll(){
		return repo.findAll();
	}
	
	@GetMapping("/{modCode}")
	Module findById(@PathVariable String modCode) {
		Optional<Module> module = repo.findById(modCode);
		
		if(module.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Module not found");
		}
		
		return module.get();
		
	}
	
	
	@GetMapping("/users/{userId}")
	List<Module> findByUId(@PathVariable int userId) {
		List<Module> mods = new ArrayList<>();
		mods = repo.findByUid(userId);
		
		if(mods.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Module not found");
		}
		
		
		return mods;
		
	}
	
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("")
	void create(@RequestBody Module mod) {
		repo.save(mod);
		
	}
	
	

}
