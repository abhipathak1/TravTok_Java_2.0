package com.travtok.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travtok.exception.UserRegistrationException;
import com.travtok.model.Booking;
import com.travtok.model.TravelDetail;
import com.travtok.model.User;
import com.travtok.repository.BookingRepository;
import com.travtok.repository.TravelDetailRepository;
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

	@Autowired
	private TravelDetailRepository travelDetailRepository;

	@Autowired
	private BookingRepository bookingRepository;

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
	
	
	
	
//	------------------------------------------------------------------------------------------------------------------
//	------------------------------------------------------------------------------------------------------------------

	@PostMapping("/book-travel/{travelDetailId}")
	public ResponseEntity<String> bookTravelPackage(@PathVariable Long travelDetailId) {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

	    if (authentication != null && authentication.isAuthenticated()) {
	        String username = authentication.getName();
	        Optional<User> optionalUser = userRepository.findByUsername(username);

	        if (optionalUser.isPresent()) {
	            User user = optionalUser.get();
	            Optional<TravelDetail> optionalTravelDetail = travelDetailRepository.findById(travelDetailId);

	            if (optionalTravelDetail.isPresent()) {
	                TravelDetail travelDetail = optionalTravelDetail.get();
	                Booking booking = new Booking(user, travelDetail);
	                bookingRepository.save(booking);
	                return ResponseEntity.ok("Travel Package Booked Successfully");
	            } else {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Travel detail not found");
	            }
	        }
	    }
	    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
	}
	
	
	
	@GetMapping("/my-bookings")
	public ResponseEntity<List<Booking>> getUserBookings() {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

	    if (authentication != null && authentication.isAuthenticated()) {
	        String username = authentication.getName();
	        Optional<User> optionalUser = userRepository.findByUsername(username);

	        if (optionalUser.isPresent()) {
	            User user = optionalUser.get();
	            List<Booking> bookings = bookingRepository.findByUser(user);
	            return ResponseEntity.ok(bookings);
	        }
	    }
	    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
	}

	
	@DeleteMapping("/cancel-booking/{bookingId}")
	public ResponseEntity<String> cancelBooking(@PathVariable Long bookingId) {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

	    if (authentication != null && authentication.isAuthenticated()) {
	        Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);

	        if (optionalBooking.isPresent()) {
	            Booking booking = optionalBooking.get();
	            bookingRepository.delete(booking);
	            return ResponseEntity.ok("Booking canceled successfully");
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");
	        }
	    }
	    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
	}

//	------------------------------------------------------------------------------------------------------------------
//	------------------------------------------------------------------------------------------------------------------


}
