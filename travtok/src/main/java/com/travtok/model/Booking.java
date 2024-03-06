package com.travtok.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

@Entity
public class Booking {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@NotNull(message = "User can't be null")
	private User user;

	@ManyToOne
	@JoinColumn(name = "travel_detail_id")
	@NotNull(message = "Travel detail can't be null")
	private TravelDetail travelDetail;

	public Booking() {
	}

	public Booking(@NotNull(message = "User can't be null") User user,
			@NotNull(message = "Travel detail can't be null") TravelDetail travelDetail) {
		super();
		this.user = user;
		this.travelDetail = travelDetail;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public TravelDetail getTravelDetail() {
		return travelDetail;
	}

	public void setTravelDetail(TravelDetail travelDetail) {
		this.travelDetail = travelDetail;
	}

}
