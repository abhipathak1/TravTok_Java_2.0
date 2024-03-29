const carousel = document.querySelector(".carousel"),
    arrowIcons = document.querySelectorAll(".wrapper i"),
    firstImgWidth = carousel.querySelector("img").clientWidth + 14; // getting first img width & adding 14 margin value

let isDragging = false,
    startX,
    scrollLeft;

// showing and hiding prev/next icon according to carousel scroll left value
const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

// scrolling images/carousel to left according to mouse pointer
const dragging = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX;
    const diff = startX - x;
    carousel.scrollLeft = scrollLeft + diff;
    showHideIcons();
}

carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    scrollLeft = carousel.scrollLeft;
    carousel.classList.add("dragging");
});

carousel.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    scrollLeft = carousel.scrollLeft;
    carousel.classList.add("dragging");
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    carousel.classList.remove("dragging");
});

document.addEventListener("touchend", () => {
    isDragging = false;
    carousel.classList.remove("dragging");
});

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
    });
});

// if there is no image left to scroll then return from here
const autoSlide = () => {
    if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    const valDifference = firstImgWidth - Math.abs(startX - (startX - scrollLeft + carousel.scrollLeft));
    carousel.scrollLeft += (carousel.scrollLeft > scrollLeft) ? (startX - (startX - scrollLeft + carousel.scrollLeft) > firstImgWidth / 3 ? valDifference : -startX + startX - scrollLeft + carousel.scrollLeft) : (startX - (startX - scrollLeft + carousel.scrollLeft) > firstImgWidth / 3 ? -valDifference : startX - startX + scrollLeft - carousel.scrollLeft);

    setTimeout(() => autoSlide(), 3000);
};

setTimeout(() => autoSlide(), 3000);


// ToptobottomPart

var backToTopBtn = document.querySelector("#back-to-topbtn");

window.addEventListener("scroll", function () {
    if (window.pageYOffset > 100) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
});

backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// TravelDetailsRedirection

let travelDetailsRedirection = document.getElementsByClassName("TravelDetailsRedirection");
for (let i = 0; i < travelDetailsRedirection.length; i++) {
    travelDetailsRedirection[i].addEventListener("click", () => {
        location.href = "Html/TravelDetails.html";
    });
}

// login_SignUpRedirection

let login_SignUpRedirection = document.getElementById("login_SignUpRedirection");
login_SignUpRedirection.addEventListener("click", () => {
    location.href = "Html/login_SignUp.html";
})




// -----------------------------------------------------------------------
// -----------------------------------------------------------------------


document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('token');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const loginLogoutBtn = document.getElementById('loginLogoutBtn');
  
    if (token) {
        const decodedToken = parseJwt(token);
        const username = decodedToken.sub;
  
        usernameDisplay.textContent = `Welcome, ${username}!`;
  
        loginLogoutBtn.textContent = 'Logout';
        loginLogoutBtn.addEventListener('click', function() {
            localStorage.removeItem('token');
            alert('You have been logged out successfully.');
            window.location.href = '/index.html';
        });
    } else {
        loginLogoutBtn.textContent = 'Login';
        loginLogoutBtn.addEventListener('click', function() {
            window.location.href = '/Html/login_SignUp.html';
        });
    }
});


// Function to parse JWT token
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}



// -----------------------------------------------------------------------
// -----------------------------------------------------------------------


// booking redirection


let bookingsBtn = document.getElementById("bookingsBtn");

bookingsBtn.addEventListener("click", () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in first');
        return;
    }
    location.href = "/Html/booking.html";
});
