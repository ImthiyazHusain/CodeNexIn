// js/navbar.js
function initNavbar() {
  const navLinks = document.querySelectorAll(".nav-links li a");
  const hamburger = document.getElementById("hamburger");
  const navLinksContainer = document.getElementById("nav-links");
  const logoLink = document.querySelector(".logo-container a");

  function setActiveLink(clickedLink) {
    navLinks.forEach((l) => l.classList.remove("active"));
    clickedLink.classList.add("active");
  }

  // Link click
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      setActiveLink(this);
      if (window.innerWidth <= 599) {
        navLinksContainer.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Hamburger toggle
  hamburger.addEventListener("click", () => {
    const isOpen = navLinksContainer.classList.toggle("open");
    hamburger.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 599) {
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

  // Keyboard accessibility
  hamburger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      hamburger.click();
    }
  });

  // Logo sets Home active
  logoLink.addEventListener("click", () => {
    setActiveLink(navLinks[0]);
  });

  // Auto highlight current page
  navLinks.forEach((link) => {
    if (link.href === window.location.href) {
      setActiveLink(link);
    }
  });
}
