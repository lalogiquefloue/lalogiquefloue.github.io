export function loadNavbar() {
    fetch('./navbar.html')
        .then(response => {
            if (!response.ok) throw new Error("Navbar not found");
            return response.text();
        })
        .then(data => {
            const navBar = document.getElementById('navbar-placeholder');
            navBar.innerHTML = data;

            // Menu toggle script
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

            // Highlight current page (desktop + mobile)
            const navLinks = navBar.querySelectorAll('nav a');
            const currentPath = window.location.pathname.split("/").pop() || 'index.html';
            // console.log(currentPath);

            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === currentPath) {
                    link.classList.add('border-black', 'font-bold');
                }
            });
        })
        .catch(err => console.error(err));
}
