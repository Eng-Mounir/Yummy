const sidebar = document.getElementById("sidebar");
const openBtn = document.getElementById("openSidebar");
const openIcon = openBtn.querySelector("i"); 
const content = document.getElementById("content");
const leftNavbar = document.querySelector(".left-navbar");
const allFields = document.querySelector(".allFields");  // ✅ Fix here

// TOGGLE SIDEBAR WITH SAME BUTTON
openBtn.addEventListener("click", () => {

    sidebar.classList.toggle("active");
    content.classList.toggle("shift");
    leftNavbar.classList.toggle("shift");
    allFields.classList.toggle("shift");   // ✅ Now this works

    // Change icon
    if (sidebar.classList.contains("active")) {
        openIcon.classList.remove("fa-bars");
        openIcon.classList.add("fa-xmark");
    } else {
        openIcon.classList.add("fa-bars");
        openIcon.classList.remove("fa-xmark");
    }
});
