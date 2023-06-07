package com.pilot.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * This class is used to declare properties related User Info
 * 
 * @author Red Devil
 * @since 2020-10-10
 */
@Entity
@Table(name = "user")
public class UserInfoEntity {

	@Id
	@Column(name = "username", nullable = false)
	private String username;

	@Column(name = "password", nullable = true)
	private String password;

	@Column(name = "role", nullable = true)
	private String userRole;

	/**
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * @param username the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * @return the userRole
	 */
	public String getUserRole() {
		return userRole;
	}

	/**
	 * @param userRole the userRole to set
	 */
	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}
}