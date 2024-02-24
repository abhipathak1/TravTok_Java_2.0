const api = "http://localhost:8080/admin/all-User"; 
const deleteApi = "http://localhost:8080/admin/DeleteUser/";

window.addEventListener("load", () => {
    fetchData();
});

// Fetch the data from the API
async function fetchData() {
    try {
        let res = await fetch(api);
        let data = await res.json();
        renderData(data);
    } catch (error) {
        console.log(error);
    }
}

// Render the data in the table
function renderData(data) {
    tbody.innerHTML = "";

    data.forEach((el) => {
        // Create the table row and cells
        let row = document.createElement("tr");
        let idCell = document.createElement("td");
        let nameCell = document.createElement("td");
        let emailCell = document.createElement("td");
        let roleCell = document.createElement("td"); // Added role cell
        let deleteCell = document.createElement("td");

        // Create the id element and set its text
        let id = document.createElement("p");
        id.innerText = el.id;

        // Create the name element and set its text
        let name = document.createElement("p");
        name.innerText = el.username;

        // Create the email element and set its text
        let email = document.createElement("p");
        email.innerText = el.email;

        // Create the role element and set its text
        let role = document.createElement("p");
        role.innerText = el.role; // Assuming role is a property of the user object

        // Create the delete button and set its properties and event listener
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("card-delete");
        deleteButton.innerText = "Delete";

        deleteButton.addEventListener("click", async () => {
            try {
                let response = await fetch(`${deleteApi}${el.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    alert("User Deleted From Server");
                    fetchData(); // Fetch data again after successful deletion
                } else {
                    console.error("Error deleting user:", response.statusText);
                }
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        });

        // Appending data
        idCell.append(id);
        nameCell.append(name);
        emailCell.append(email);
        roleCell.append(role); // Append the role cell
        deleteCell.append(deleteButton);
        row.append(idCell, nameCell, emailCell, roleCell, deleteCell); // Include role cell in the row
        tbody.append(row);
    });
}

// Add EventListeners for Page loads
let DashBoard = document.getElementById("DashBoard");
let Tours = document.getElementById("Tours");
let Users = document.getElementById("Users");

DashBoard.addEventListener("click", () => {
    location.href = "admin.html";
});
Users.addEventListener("click", () => {
    location.href = "adminUsers.html";
});
Tours.addEventListener("click", () => {
    location.href = "adminTourPackages.html";
});
