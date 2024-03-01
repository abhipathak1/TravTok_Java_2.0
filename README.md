# TravTok - Your Ultimate Travel Companion

TravTok is a user-friendly travel website designed to help users discover hidden gems around the world and embark on unforgettable adventures. Whether you're planning a dream vacation or seeking inspiration for your next trip.



<p align="center">
  <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=24&pause=1000&color=F75C7E&center=true&width=435&lines=TravTok;Things to Do in Seoul" alt="Typing SVG" /></a>
</p>

TravTok serves as a traveler's guide for exploring Seoul based on the theme 'Things to do in Seoul'. From iconic landmarks to off-the-beaten-path attractions, TravTok offers curated recommendations to make your Seoul experience truly memorable.

## Features

- **Discover Destinations:** Explore unique destinations and find exciting things to do.
- **User Registration and Authentication:** Users can register, login, and manage their profiles securely.
- **Book Travel Packages:** Book travel packages effortlessly and securely.
- **View and Manage Bookings:** Users can view their bookings and cancel them if needed.
- **Admin Panel:** Admins can manage travel details, users, and user roles.

## Technologies Used

- **Frontend:**
  - HTML
  - CSS
  - JavaScript

- **Backend:**
  - Java Spring Boot

- **Database:**
  - MySQL

![TravTok_Java_2 0_Schema](https://github.com/abhipathak1/TravTok_Java_2.0/assets/123934582/4535613e-15ea-4ad4-a57e-d34030cccdfc)

## Project Structure

The project includes the following components:

- **Controllers** (`src/main/java/com/travtok/controller/`): Handles HTTP requests and defines RESTful APIs.

  - `AdminController.java`: Manages admin-related operations.
    - `POST /admin/add-travel-detail`: Add a new travel detail.
    - `GET /admin/all-travel-details`: Get all travel details.
    - `PUT /admin/edit-price/{id}`: Update price of a travel detail by ID.
    - `DELETE /admin/delete/{id}`: Delete a travel detail by ID.
    - `GET /admin/all-User`: Get all users.
    - `DELETE /admin/DeleteUser/{id}`: Delete a user by ID.
    - `PUT /admin/make-admin/{id}`: Make a user an admin by ID.

  - `UserController.java`: Handles user-related operations.
    - `POST /user/register`: Register a new user.
    - `POST /user/login`: Login a user.
    - `POST /user/book-travel/{travelDetailId}`: Book a travel package.
    - `GET /user/my-bookings`: Get bookings of the current user.
    - `DELETE /user/cancel-booking/{bookingId}`: Cancel a booking by ID.

- **Models** (`src/main/java/com/travtok/model/`): Contains Java classes representing data models.

  - `User.java`: Represents a user.
  - `Booking.java`: Represents a booking.
  - `TravelDetail.java`: Represents details of a travel package.

- **Repositories** (`src/main/java/com/travtok/repository/`): Interfaces for interacting with the database using Spring Data JPA.

  - `UserRepository.java`: Manages user data.
  - `BookingRepository.java`: Manages booking data.
  - `TravelDetailRepository.java`: Manages travel detail data.

- **Utilities** (`src/main/java/com/travtok/utils/`): Utility classes.

  - `JwtHelper.java`: Handles JWT token generation and validation.

- **Resources** (`src/main/resources/`): Contains application properties and configurations.


## Setup Instructions

1. **Set Up MySQL Database:**
   - Create a MySQL database named `travtok`.
   - Update the database configurations in `src/main/resources/application.properties` if necessary.

2. **Build and Run the Application:**
   - Open the project in your preferred IDE.
   - Build and run the application using Maven.
   - Alternatively, you can run the application using the command line:
     ```bash
     mvn spring-boot:run
     ```

3. **Access the Application:**
   - Open a web browser and navigate to `http://localhost:8080` to access the application.



If you find this project helpful or interesting, show your support by giving it a ⭐️ on GitHub!

Thank you for using TravTok! 🌍✈️
