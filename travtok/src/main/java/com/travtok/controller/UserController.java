package com.travtok.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travtok.exception.UserRegistrationException;
import com.travtok.model.User;
import com.travtok.repository.UserRepository;
import com.travtok.utils.JwtHelper;
import com.travtok.utils.JwtRequest;
import com.travtok.utils.JwtResponse;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private JwtHelper jwtHelper;

	@Autowired
	private AuthenticationManager manager;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

//	@PostMapping("/register")
//	public String registerUser(@RequestBody User user) {
//		user.setPassword(passwordEncoder.encode(user.getPassword()));
//		userRepository.save(user);
//		return "User Created Success";
//	}
	
	

//	@PostMapping("/register")
//	public ResponseEntity<String> registerUser(@RequestBody User user) {
//	    user.setPassword(passwordEncoder.encode(user.getPassword()));
//	    userRepository.save(user);
//	    return ResponseEntity.status(HttpStatus.CREATED).body("User Created Successfully");
//	}
	
	@PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) throws UserRegistrationException {
        // Example check that might throw a custom exception
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
        	 return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User Registered Successfully");
    }


	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody JwtRequest request) {
	    try {
	        Authentication authentication = new UsernamePasswordAuthenticationToken(request.getUsername(),
	                request.getPassword());
	        Authentication authenticated = manager.authenticate(authentication);

	        UserDetails userDetails = (UserDetails) authenticated.getPrincipal();
	        String token = this.jwtHelper.generateToken(userDetails);

	        JwtResponse jwtResponse = new JwtResponse(userDetails.getUsername(), token);

	        return ResponseEntity.ok(jwtResponse);
	    } catch (BadCredentialsException e) {
	        // Handle bad credentials (username or password incorrect)
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
	    } catch (Exception e) {
	        // Handle other exceptions if any
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
	    }
	}
	
	
	
}
