package com.travtok.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travtok.model.TravelDetail;
import com.travtok.repository.TravelDetailRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private TravelDetailRepository travelDetailRepository;

    @PostMapping("/add-travel-detail")
    public ResponseEntity<String> addTravelDetail(@Valid @RequestBody TravelDetail travelDetail) {
        travelDetailRepository.save(travelDetail);
        return new ResponseEntity<>("Travel Detail Created Successfully", HttpStatus.CREATED);
    }
    
    @GetMapping("/all-travel-details")
    public ResponseEntity<List<TravelDetail>> getAllTravelDetails() {
        List<TravelDetail> travelDetails = travelDetailRepository.findAll();
        return new ResponseEntity<>(travelDetails, HttpStatus.OK);
    }

    @PutMapping("/edit-price/{id}")
    public ResponseEntity<String> editPriceById(@PathVariable Long id, @RequestBody TravelDetail travelDetail) {
        Optional<TravelDetail> optionalTravelDetail = travelDetailRepository.findById(id);
        if (optionalTravelDetail.isPresent()) {
            TravelDetail existingTravelDetail = optionalTravelDetail.get();
            existingTravelDetail.setPrice(travelDetail.getPrice());
            travelDetailRepository.save(existingTravelDetail);
            return new ResponseEntity<>("Price updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Travel Detail not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTravelDetailById(@PathVariable Long id) {
        Optional<TravelDetail> optionalTravelDetail = travelDetailRepository.findById(id);
        if (optionalTravelDetail.isPresent()) {
            travelDetailRepository.deleteById(id);
            return new ResponseEntity<>("Travel Detail deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Travel Detail not found", HttpStatus.NOT_FOUND);
        }
    }	
    
    
}
