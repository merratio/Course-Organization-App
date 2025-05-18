package com.courseOrg;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "modules")
public class Module {
	@Id
	private String modCode;
	private String modName;
	private int userId;
	
	public Module() {
		modCode = "";
		modName = "";
	}
	
	public Module(String code, String name) {
		this.modCode = code;
		this.modName = name;
	}
	

	public Module(String modCode, String modName, int userId) {
		super();
		this.modCode = modCode;
		this.modName = modName;
		this.userId = userId;
	}

	public String getModCode() {
		return modCode;
	}

	public void setModCode(String modCode) {
		this.modCode = modCode;
	}

	public String getModName() {
		return modName;
	}

	public void setModName(String modName) {
		this.modName = modName;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "Module [modCode=" + modCode + ", modName=" + modName + ", userId=" + userId + "]";
	}

	

	
	

}
