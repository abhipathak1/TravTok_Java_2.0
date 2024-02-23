package com.travtok.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travtok.model.TravelDetail;


public interface TravelDetailRepository extends JpaRepository<TravelDetail, Long> {
	
}
