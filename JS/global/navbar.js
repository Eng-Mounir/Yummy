// Load the navbar HTML dynamically
async function loadNavbar() {
    const placeholder = document.getElementById("navbar-placeholder");
    if (!placeholder) return;

    try {
        const response = await fetch("components/navbar.html");
        const html = await response.text();
        placeholder.innerHTML = html;

        // After HTML is inserted, initialize toggle
        initNavbarToggle();
    } catch (err) {
        console.error("Error loading navbar:", err);
    }
}

// Initialize sidebar toggle
function initNavbarToggle() {
    const sidebar = document.getElementById("sidebar");
    const openBtn = document.getElementById("openSidebar");
    if (!sidebar || !openBtn) return; // safety check

    const openIcon = openBtn.querySelector("i"); 
    const content = document.getElementById("content");
    const leftNavbar = document.querySelector(".left-navbar");
    const allFields = document.querySelector(".allFields");  // optional

    openBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        content.classList.toggle("shift");
        leftNavbar.classList.toggle("shift");
        if (allFields) allFields.classList.toggle("shift");

        // Change icon bars ↔ xmark
        if (sidebar.classList.contains("active")) {
            openIcon.classList.remove("fa-bars");
            openIcon.classList.add("fa-xmark");
        } else {
            openIcon.classList.add("fa-bars");
            openIcon.classList.remove("fa-xmark");
        }
    });
}

// Start by loading navbar
loadNavbar();
