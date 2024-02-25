
let main_section = document.querySelector(".container")
let lsdata = JSON.parse(localStorage.getItem("trvalsdata")) || []
// let data = "https://64521317bce0b0a0f73bef09.mockapi.io/TravelDetails"

let data2 = []

let itemsPerPage = 4 // Number of items to show per page
let currentPage = 1 // Current page number

fetchdata();

function fetchdata() {
    fetch('http://localhost:8080/admin/all-travel-details')
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            data2 = data
            appends(data)
        })
        .catch((error) => { console.log(error) })
}

function appends(data) {
    console.log("append")
    main_section.innerHTML = ""
    let card_list = document.createElement('div')
    card_list.id = "card_list"

    // Calculate the start and end index of the current page
    let startIndex = (currentPage - 1) * itemsPerPage
    let endIndex = Math.min(startIndex + itemsPerPage, data.length)

    // Get the current page items
    let currentData = data.slice(startIndex, endIndex)

    currentData.forEach(element => {
        let card = creating(element)
        card_list.append(card)
    });

    main_section.append(card_list)

    // Calculate the total number of pages
    let totalPages = Math.ceil(data.length / itemsPerPage)

    // Create the pagination buttons
    let paginationButtons = document.querySelector('.pagination')
    paginationButtons.innerHTML = ''

    for (let i = 1; i <= totalPages; i++) {
        let button = document.createElement('button')
        button.textContent = i

        if (i === currentPage) {
            button.classList.add('active')
        }

        button.addEventListener('click', () => {
            currentPage = i
            appends(data)
        })

        paginationButtons.appendChild(button)
    }

    // Main Input - Search by Title
    let search = document.querySelector(".inputtext")

    search.oninput = () => {
        let f = data2.filter(function (el) {
            return el.title.toUpperCase().includes(search.value.toUpperCase());
        })
        appends(f)
    }

    // Sort By Price - Low to High
    document.getElementById("sort-low-to-high").onclick = () => {
        data.sort((a, b) => a.price - b.price)
        appends(data)
    }

    // Sort By Price - High to Low
    document.getElementById("sort-high-to-low").onclick = () => {
        data.sort((a, b) => b.price - a.price)
        appends(data)
    }

    // Search By Location
    let searchbylocation = document.querySelector(".location")
    searchbylocation.oninput = () => {
        let f2 = data2.filter(function (el) {
            return el.location.toUpperCase().includes(searchbylocation.value.toUpperCase());
        })
        appends(f2)
    }

    // Filter by Seasons
    let season = document.getElementById("button4")
    let day = document.getElementById("button5")
    let time = document.getElementById("button6")

    season.onclick = (e) => {
        e.preventDefault()
        let filterdata = data2.filter((el) => {
            return el.open.includes("season")
        })
        appends(filterdata)
    }

    day.onclick = (e) => {
        e.preventDefault()
        let filterdata = data2.filter((el) => {
            return el.open.includes("Days")
        })
        appends(filterdata)
    }

    time.onclick = (e) => {
        e.preventDefault()
        let filterdata = data2.filter((el) => {
            return el.open.includes("Daily")
        })
        appends(filterdata)
    }
}

function creating(data) {
    let card = document.createElement("div");
    card.classList.add("card");

    let Information = document.createElement("div");
    Information.id = "Information";

    let title = document.createElement("p");
    title.classList.add("name");
    title.textContent = data.title;

    let description = document.createElement("p");
    description.classList.add("description");
    description.textContent = data.description;

    let location = document.createElement("p");
    location.classList.add("location");
    location.textContent = `Location : ${data.location}`;

    let Time = document.createElement("p");
    Time.classList.add("Time");
    Time.textContent = `Time : ${data.open}`;

    let price = document.createElement("p");
    price.classList.add("price");
    price.textContent = `${"$"}${data.price}.00/per adult`;

    let bt = document.createElement("button");
    bt.id = "button";
    bt.textContent = "Book";

    bt.dataset.travelDetailId = data.id; // Assuming data.id contains the travel detail ID
    bt.addEventListener("click", handleBookButtonClick);

    Information.append(title, description, location, Time, price, bt);

    let images = document.createElement("div");
    images.classList.add("images");
    let img = document.createElement("img");
    img.src = data.images;

    images.append(img);

    card.append(images, Information);
    return card;
}



function handleBookButtonClick(event) {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please log in first");
        window.location.href = "login_SignUp.html";
        return;
    }
    const travelDetailId = event.target.dataset.travelDetailId;
    localStorage.setItem("selectedTravelDetailId", travelDetailId);
    window.location.href = "payment.html";
}



// --------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------


// login_SignUpRedirection

let login_SignUpRedirection = document.getElementById("login_SignUpRedirection");
login_SignUpRedirection.addEventListener("click", () => {
    location.href = "login_SignUp.html";
})


let resetFilter = document.getElementById("resetFilter")
resetFilter.onclick = (e) => {
    appends(data2)
}

// forfilteSection

let filteringDiv = document.querySelector('.filters');
let filterButtons = document.querySelectorAll('.filterButtons');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        toggleFilteringDiv();
    });
});

function toggleFilteringDiv() {
    filteringDiv.style.display = filteringDiv.style.display === 'none' ? 'block' : 'none';
}





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



let indexRedirection = document.getElementsByClassName("indexRedirection");
for (let i = 0; i < indexRedirection.length; i++) {
    indexRedirection[i].addEventListener("click", () => {
        location.href = "/index.html";
    });
}

