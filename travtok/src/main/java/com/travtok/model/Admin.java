package com.travtok.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Admin {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "Name can't be blank")
	private String name;

	@NotBlank(message = "Password can't be blank")
	private String password;

	@NotBlank(message = "Email can't be blank")
	@Email(regexp = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$", message = "Email should be in a proper format i.e example@domain.com")
	@Column(unique = true, nullable = false)
	private String email;

	public Admin() {
		super();
	}

	public Admin(@NotBlank(message = "Name can't be blank") String name,
			@NotBlank(message = "Password can't be blank") String password,
			@NotBlank(message = "Email can't be blank") @Email(regexp = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$", message = "Email should be in a proper format i.e example@domain.com") String email) {
		super();
		this.name = name;
		this.password = password;
		this.email = email;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
