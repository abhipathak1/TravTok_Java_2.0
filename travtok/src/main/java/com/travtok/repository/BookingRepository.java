package com.travtok.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travtok.model.Booking;
import com.travtok.model.User;

public interface BookingRepository extends JpaRepository<Booking, Long> {

	List<Booking> findByUser(User user);

}
