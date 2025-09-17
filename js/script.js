// js/navbar.js
function initNavbar() {
  const navLinks = document.querySelectorAll(".nav-links li a");
  const hamburger = document.getElementById("hamburger");
  const navLinksContainer = document.getElementById("nav-links");
  const logoLink = document.querySelector(".logo-container a");
  const loginButtonLi = document.getElementById("login-button");
  const dashboardDropdown = document.getElementById("dashboard-dropdown");

  // Simulate login state
  let isLoggedIn = false;

  // Function to update navbar based on login state
  function updateNavbar() {
    if (isLoggedIn) {
      loginButtonLi.style.display = "none";
      dashboardDropdown.style.display = "block";
    } else {
      loginButtonLi.style.display = "block";
      dashboardDropdown.style.display = "none";
    }
  }

  // Initial update
  updateNavbar();

  function setActiveLink(clickedLink) {
    navLinks.forEach((l) => l.classList.remove("active"));
    clickedLink.classList.add("active");
  }

  // Nav link click
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Prevent default for login button to simulate login
      // if (this.parentElement.id === "login-button") {
      //   e.preventDefault();
      //   // Simulate login toggle
      //   isLoggedIn = true;
      //   updateNavbar();
      //   // Close menu on mobile/tablet
      //   if (window.innerWidth <= 1300) {
      //     navLinksContainer.classList.remove("open");
      //     hamburger.classList.remove("open");
      //     hamburger.setAttribute("aria-expanded", "false");
      //   }
      //   return;
      // }

      setActiveLink(this);
      if (window.innerWidth <= 1300) {
        // Apply to mobile and tablet
        navLinksContainer.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Hamburger click toggle
  hamburger.addEventListener("click", () => {
    const isOpen = navLinksContainer.classList.toggle("open");
    hamburger.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Click outside to close mobile menu
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 1300) {
      // Apply to mobile and tablet
      if (
        !navLinksContainer.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        navLinksContainer.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      }
    }
  });

  // Hamburger keyboard accessibility
  hamburger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      hamburger.click();
    }
  });

  // Logo click sets Home active
  logoLink.addEventListener("click", () => {
    setActiveLink(navLinks[0]);
  });

  // Optional: highlight link based on URL
  navLinks.forEach((link) => {
    if (link.href === window.location.href) {
      setActiveLink(link);
    }
  });
}
