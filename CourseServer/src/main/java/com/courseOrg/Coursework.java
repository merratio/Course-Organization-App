package com.courseOrg;

import java.util.Date;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "coursework")
public class Coursework {
	private String name;
	private int percentage;
	private Date dueDate;
	private int gradeOutOf100;
	private int gradeOutOfPercentage;
	private int userId;
	private String moduleCode;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int courseId;
	
	public Coursework() {
		this.name = "";
		this.percentage = 0;
		this.dueDate = new Date();
		this.gradeOutOf100 = 0;
		this.gradeOutOfPercentage = 0;
		this.userId = 0;
		this.moduleCode = "";
		this.courseId = 0;
	}
	
	public Coursework(String name, int percentage, Date dueDate, int gradeOutOf100, int gradeOutOfPercentage,
			int userId, String moduleCode, int courseId) {
		this.name = name;
		this.percentage = percentage;
		this.dueDate = dueDate;
		this.gradeOutOf100 = gradeOutOf100;
		this.gradeOutOfPercentage = gradeOutOfPercentage;
		this.userId = userId;
		this.moduleCode = moduleCode;
		this.courseId = courseId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPercentage() {
		return percentage;
	}

	public void setPercentage(int percentage) {
		this.percentage = percentage;
	}

	public Date getDueDate() {
		return dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

	public int getGradeOutOf100() {
		return gradeOutOf100;
	}

	public void setGradeOutOf100(int gradeOutOf100) {
		this.gradeOutOf100 = gradeOutOf100;
	}

	public int getGradeOutOfPercentage() {
		return gradeOutOfPercentage;
	}

	public void setGradeOutOfPercentage(int gradeOutOfPercentage) {
		this.gradeOutOfPercentage = gradeOutOfPercentage;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getModuleCode() {
		return moduleCode;
	}

	public void setModuleCode(String moduleCode) {
		this.moduleCode = moduleCode;
	}

	public int getCourseId() {
		return courseId;
	}

	public void setCourseId(int courseId) {
		this.courseId = courseId;
	}
	
	
	
	

}
