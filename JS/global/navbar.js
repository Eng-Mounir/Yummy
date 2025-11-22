
const sidebar = document.getElementById("sidebar");
const openBtn = document.getElementById("openSidebar");
const openIcon = openBtn.querySelector("i"); 
const content = document.getElementById("content");
const leftNavbar = document.querySelector(".left-navbar"); // NEW

const loadingIcon = document.querySelector(".loading");

// TOGGLE SIDEBAR WITH SAME BUTTON
openBtn.addEventListener("click", () => {

    // Toggle classes
    sidebar.classList.toggle("active");
    content.classList.toggle("shift");
    leftNavbar.classList.toggle("shift");   // NEW → move white menu right

    // Change icon bars ↔ xmark
    if (sidebar.classList.contains("active")) {
        openIcon.classList.remove("fa-bars");
        openIcon.classList.add("fa-xmark");
    } else {
        openIcon.classList.add("fa-bars");
        openIcon.classList.remove("fa-xmark");
    }
});
