let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
  slider.classList.add("moveslider");
  formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
  slider.classList.remove("moveslider");
  formSection.classList.remove("form-section-move");
});


// --------------------------------------Resistration-------------------------------------------
// --------------------------------------Resistration-------------------------------------------

// Get reference to the signup button
const signupButton = document.querySelector('.signbtn');

// Add event listener to the signup button
signupButton.addEventListener('click', async () => {
  // Get user input values
  const nameInput = document.querySelector('.name');
  const emailInput = document.querySelector('.signEmail');
  const passwordInput = document.querySelector('.signPassword');

  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  // Create user object
  const newUser = {
    username: name,
    email: email,
    password: password
  };

  try {
    // Send POST request to backend API
    const response = await fetch('http://localhost:8080/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    // Check if registration was successful
    if (response.ok) {
      // Registration successful
      const responseData = await response.text(); // Get response body
      alert(responseData); // Display response message
      location.reload()
      // Clear the form fields
      nameInput.value = '';
      emailInput.value = '';
      passwordInput.value = '';
      // You can perform further actions here, such as redirecting the user to a login page
    } else {
      // Registration failed
      const responseData = await response.text(); // Get response body
      alert(responseData); // Display response message
      console.error('Registration failed:', response.statusText);
    }
  } catch (error) {
    console.error('Error during registration:', error);
  }
});


// ----------------------------------------Login-----------------------------------------------------
// ----------------------------------------Login-----------------------------------------------------


const loginButton = document.querySelector('.logbtn');

loginButton.addEventListener('click', async () => {
  const emailInput = document.querySelector('.email');
  const passwordInput = document.querySelector('.password');

  const email = emailInput.value;
  const password = passwordInput.value;

  // Create login request object
  const loginRequest = {
    username: email,
    password: password
  };

  try {
    // Send POST request to backend API for login
    const response = await fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginRequest)
    });


    if (response.ok) {

      const responseData = await response.json();
      console.log('Response data:', responseData);

      // Save token to local storage
      localStorage.setItem('token', responseData.token);

      // Redirect user based on their role
      if (responseData.username === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "/index.html";
      }
    } else {
      // Login failed
      const responseData = await response.text();
      alert(responseData);
      console.error('Login failed:', response.statusText);
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
});




// ----------------------------------------Appending The logo-----------------------------------------------------
// ----------------------------------------Appending The logo-----------------------------------------------------


const travtok = document.getElementById("travtok");
const text = "TravTok";
let currentIndex = 0;

function appendNextLetter() {
  if (currentIndex < text.length) {
    const nextLetter = text[currentIndex];
    const span = document.createElement("span");
    span.textContent = nextLetter;
    travtok.appendChild(span);

    span.getBoundingClientRect();
    span.style.opacity = "1";
    currentIndex++;
    setTimeout(appendNextLetter, 800); // Adjust the delay (in milliseconds) between each letter
  }
}
appendNextLetter();

// indexRedirection
travtok.addEventListener("click", () => {
  location.href = "/index.html";
})


// ----------------------------------------Hide Password-----------------------------------------------------
// ----------------------------------------Hide Password-----------------------------------------------------


let toggle = document.querySelector("#aajaDekhle");
let input = document.querySelector(".password");

toggle.addEventListener("click", () => {
  if (input.type === "password") {
    input.type = "text";
    document.getElementById('passwordIcon').classList.remove('fa-eye');
    document.getElementById('passwordIcon').classList.add('fa-eye-slash');
  } else {
    input.type = "password";
    document.getElementById('passwordIcon').classList.remove('fa-eye-slash');
    document.getElementById('passwordIcon').classList.add('fa-eye');
  }
});