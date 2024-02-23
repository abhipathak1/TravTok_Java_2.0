package com.travtok.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class TravelDetail {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title can't be blank")
    private String title;

    @NotBlank(message = "Images URL can't be blank")
    private String images;

    @NotBlank(message = "Location can't be blank")
    private String location;

    @NotBlank(message = "Description can't be blank")
    private String description;

    @NotBlank(message = "Open time can't be blank")
    private String open;

    @NotBlank(message = "Price can't be blank")
    private String price;

    public TravelDetail() {
        super();
    }

    public TravelDetail(String title, String images, String location, String description, String open, String price) {
        this.title = title;
        this.images = images;
        this.location = location;
        this.description = description;
        this.open = open;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOpen() {
        return open;
    }

    public void setOpen(String open) {
        this.open = open;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

}
