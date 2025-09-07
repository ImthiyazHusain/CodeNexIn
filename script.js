  fetch("navbar.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("navbar").innerHTML = data;

    
      const hamburger = document.querySelector(".hamburger");
      const navLinks = document.querySelector(".nav-links");

      if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
          hamburger.classList.toggle("open");
          navLinks.classList.toggle("open");
        });
      }
    });

  fetch("footer.html")
    .then(res => res.text())
    .then(data => { document.getElementById("footer").innerHTML = data; });