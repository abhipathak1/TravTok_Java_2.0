
const api = "http://localhost:8080";
let tbody = document.getElementById("tbody")
let paginationwrapper = document.getElementById("pagination-wrapper");

// Get the edit modal
var editmodal = document.getElementById("edit-price-modal");

window.addEventListener("load", () => {
  fetchData(1)
});

let update_price = document.getElementById("product-price-input")

// Fetch the data from the API
async function fetchData(pageNumber) {
  try {
    const res = await fetch(`${api}/admin/all-travel-details?page=${pageNumber}&size=5`);
    let data = await res.json();
    renderData(data);
  } catch (error) {
    console.log(error)
  }
}

// Render the data in the table
function renderData(data) {
  tbody.innerHTML = "";

  data.forEach((el) => {
    // Create the table row and cells
    let row = document.createElement("tr");
    let imageCell = document.createElement("td");
    let titleCell = document.createElement("td");
    let locationCell = document.createElement("td");
    let openCell = document.createElement("td");
    let priceCell = document.createElement("td");
    let editCell = document.createElement("td");
    let deleteCell = document.createElement("td");

    // Create the image element and set its properties
    let image = document.createElement("img");
    image.classList.add("card-img");
    image.src = el.images;

    // Create the title element and set its text
    let title = document.createElement("p");
    title.innerText = el.title;

    // Create the location element and set its text
    let location = document.createElement("p");
    location.innerText = el.location;

    // Create the open element and set its text
    let open = document.createElement("p");
    open.innerText = el.open;

    // Create the price element and set its text
    let price = document.createElement("p");
    price.innerText = `${el.price}$`;

    // Create the edit button and set its properties
    let editButton = document.createElement("button");
    editButton.classList.add("card-edit");
    editButton.innerText = "Edit";

    editButton.onclick = function () {
      editmodal.style.display = "block";
      update_price.setAttribute("value", el.Price)

      let editsubmitbtn = document.getElementById("edit-price-form");
      editsubmitbtn.addEventListener("submit", function (event) {
        event.preventDefault();
        edit_fetchdate(el);
      })
    }

    // Create the delete button and set its properties and event listener
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("card-delete");
    deleteButton.innerText = "Delete";

    deleteButton.addEventListener("click", async () => {
      try {
        let response = await fetch(`${api}/admin/delete/${el.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (response.ok) {

          alert("Deleted Successfully");
          row.remove();
        } else {
          // Delete failed
          const responseData = await response.json();
          alert(`Error: ${responseData}`);
        }
      } catch (error) {
        console.error("Error deleting travel detail:", error);
        alert("An error occurred while deleting the travel detail.");
      }
    });

    // appending data
    titleCell.append(title)
    locationCell.append(location)
    openCell.append(open)
    priceCell.append(price)
    imageCell.append(image)
    editCell.append(editButton)
    deleteCell.append(deleteButton)
    row.append(imageCell, titleCell, locationCell, openCell, priceCell, editCell, deleteCell)
    tbody.append(row)
  });
}

// ****************pop code ************************************
let addbtn = document.getElementById("Tours-Add-btn")
// Get the modal
let modal = document.getElementById("add-product-modal");

// Get the button that opens the modal
let btn = document.getElementById("add-product-btn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
// Get input elements in model

let title = document.getElementById("product-title");
let img = document.getElementById("product-image");
let loc = document.getElementById("product-location");
let open = document.getElementById("product-open");
let price = document.getElementById("product-price");
let des = document.getElementById("product-description");

let submitbtn = document.getElementById("product-submit")

// When the user clicks the button, open the modal
addbtn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    editmodal.style.display = "none";
  }
}

submitbtn.addEventListener("click", async () => {
  let obj = {
    title: title.value,
    images: img.value,
    location: loc.value,
    description: des.value,
    open: open.value,
    price: price.value
  };
  try {
    let res = await fetch(`${api}/admin/add-travel-detail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj)
    });
    if (res.ok) {
      alert("Travel Detail Created Successfully");
      location.reload();
    } else {
      const errorMessage = await res.text();
      alert(`Failed to create travel detail: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Error creating travel detail:", error);
  }
});


//  javascript for edit

// Get the <span> element that closes the modal
var editspan = document.getElementsByClassName("edit-close")[0];

//When the user clicks on <span> (x), close the modal
editspan.onclick = function () {
  editmodal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == editmodal) {
    editmodal.style.display = "none";
  }
}

async function edit_fetchdate(el) {
  let object = {
    ...el,
    price: update_price.value
  }
  try {
    let res = await fetch(`${api}/admin/edit-price/${el.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object)
    });
    if (res.ok) {
      alert("Price Successfully Updated");
      location.reload(); 
    } else {
      const errorMessage = await res.text();
      alert(`Failed to update price: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Error updating price:", error);
    alert("An error occurred while updating the price.");
  }
}

// AddEventListener for Page loads

let DashBoard = document.getElementById("DashBoard")
let Tours = document.getElementById("Tours")
let Users = document.getElementById("Users")

DashBoard.addEventListener("click", () => {
  location.href = "admin.html";
})
Users.addEventListener("click", () => {
  location.href = "adminUsers.html";
})
Tours.addEventListener("click", () => {
  location.href = "adminTourPackages.html";
})
