export async function loadNavbar() {
    const cacheKey = "NAVBAR_HTML";
    let navbarHTML = localStorage.getItem(cacheKey);

    // cache navbar HTML if not already in local storage
    if (!navbarHTML) {
        const response = await fetch("./navbar.html");
        if (!response.ok) throw new Error("Navbar not found");
        navbarHTML = await response.text();
        localStorage.setItem(cacheKey, navbarHTML);
    }

    const navBar = document.getElementById("navbar-placeholder");
    navBar.innerHTML = navbarHTML;

    // Menu logic
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const iconOpen = document.getElementById("icon-open");
    const iconClose = document.getElementById("icon-close");

    if (menuBtn) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
            iconOpen.classList.toggle("hidden");
            iconClose.classList.toggle("hidden");
        });
    }

    // Highlight current page
    const navLinks = navBar.querySelectorAll("nav a");
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("border-black", "font-bold");
        }
    });
}
