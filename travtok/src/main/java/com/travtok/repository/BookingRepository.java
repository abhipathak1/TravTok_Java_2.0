package com.travtok.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travtok.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

}
