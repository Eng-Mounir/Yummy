// INPUTS
var userName = document.getElementById("userName");
var userEmail = document.getElementById("userEmail");
var userPhone = document.getElementById("userPhone");
var userAge = document.getElementById("userAge");
var userPass = document.getElementById("userPass");
var userRepass = document.getElementById("userRepass");

// BUTTONS
var addBtn = document.getElementById("addBtn");
var editBtn = document.getElementById("editBtn");
var searchInput = document.getElementById("searchInput");

// MAIN LIST
var usersList = [];

// LOAD FROM LOCAL STORAGE
if (localStorage.getItem("usersArray") != null) {
    usersList = JSON.parse(localStorage.getItem("usersArray"));
    displayUsers();
}

// ADD USER
function addUser() {
    if (validateName() && validateEmail() && validatePhone() && validateAge() && validatePass() && validateRepass()) {

        var user = {
            name: userName.value,
            email: userEmail.value,
            phone: userPhone.value,
            age: userAge.value,
            password: userPass.value
        };

        usersList.push(user);

        localStorage.setItem("usersArray", JSON.stringify(usersList));

        clearInputs();
        displayUsers();
    }
}

// CLEAR INPUTS
function clearInputs() {
    userName.value = "";
    userEmail.value = "";
    userPhone.value = "";
    userAge.value = "";
    userPass.value = "";
    userRepass.value = "";

    document.querySelectorAll(".form-control").forEach(input => {
        input.classList.remove("is-valid");
        input.classList.remove("is-invalid");
    });
}



function validateName() {
    let input = document.getElementById("userName");
    let msg = document.getElementById("nameMsg");

    let regex = /^[A-Za-z ]{3,}$/;

    if (regex.test(input.value)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        msg.classList.add("d-none");
        return true;
    }

    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    msg.classList.remove("d-none");
    return false;
}

function validateEmail() {
    let input = document.getElementById("userEmail");
    let msg = document.getElementById("emailMsg");

    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;

    if (regex.test(input.value)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        msg.classList.add("d-none");
        return true;
    }

    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    msg.classList.remove("d-none");
    return false;
}

function validatePhone() {
    let input = document.getElementById("userPhone");
    let msg = document.getElementById("phoneMsg");

    let regex = /^01[0-2,5][0-9]{8}$/;

    if (regex.test(input.value)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        msg.classList.add("d-none");
        return true;
    }

    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    msg.classList.remove("d-none");
    return false;
}

function validateAge() {
    let input = document.getElementById("userAge");
    let msg = document.getElementById("ageMsg");

    if (input.value >= 16 && input.value <= 80) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        msg.classList.add("d-none");
        return true;
    }

    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    msg.classList.remove("d-none");
    return false;
}
function validatePass() {
    let input = document.getElementById("userPass");
    let msg = document.getElementById("passMsg");

    // Correct regex
    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (regex.test(input.value)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        msg.classList.add("d-none");
        return true;
    }

    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    msg.classList.remove("d-none");
    return false;
}

function validateRepass() {
    let pass = document.getElementById("userPass");
    let repass = document.getElementById("userRepass");
    let msg = document.getElementById("repassMsg");

    if (repass.value === pass.value && repass.value.length > 0) {
        repass.classList.add("is-valid");
        repass.classList.remove("is-invalid");
        msg.classList.add("d-none");
        return true;
    }

    repass.classList.add("is-invalid");
    repass.classList.remove("is-valid");
    msg.classList.remove("d-none");
    return false;
}

function validateForm() {
    return (
        validateName() &&
        validateEmail() &&
        validatePhone() &&
        validateAge() &&
        validatePass() &&
        validateRepass()
    );
}
