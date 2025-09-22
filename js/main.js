// js/main.js

// Load Navbar
fetch("navbar.html")
  .then((res) => res.text())
  .then((data) => {
    const navbarDiv = document.getElementById("navbar");
    navbarDiv.innerHTML = data;
    
    // Wait a moment for DOM to update
    setTimeout(() => {
      // Get hamburger menu elements
      const hamburger = document.getElementById('hamburger');
      const navLinks = document.getElementById('nav-links');
      const overlay = document.getElementById('overlay');
      
      if (hamburger && navLinks && overlay) {
        console.log("Hamburger elements found, adding event listeners");
        
        // Toggle mobile menu
        hamburger.addEventListener('click', function() {
          console.log("Hamburger clicked");
          navLinks.classList.toggle('open');
          hamburger.classList.toggle('open');
          overlay.classList.toggle('show');
        });
        
        // Close menu if overlay clicked
        overlay.addEventListener('click', function() {
          navLinks.classList.remove('open');
          hamburger.classList.remove('open');
          overlay.classList.remove('show');
        });
        
        // Mobile dropdown toggle
        const moreDropdown = document.getElementById('more-dropdown');
        const moreButton = document.getElementById('more-button');
        
        if (moreButton && moreDropdown) {
          moreButton.addEventListener('click', function(e) {
            if(window.innerWidth <= 900){
              e.preventDefault();
              moreDropdown.classList.toggle('open');
              moreButton.setAttribute('aria-expanded', moreDropdown.classList.contains('open'));
            }
          });
        }
        
        // Close menu on dropdown link click
        document.querySelectorAll('.dropdown-menu a').forEach(link => {
          link.addEventListener('click', function() {
            if(window.innerWidth <= 900){
              navLinks.classList.remove('open');
              hamburger.classList.remove('open');
              overlay.classList.remove('show');
            }
          });
        });
      }
      
      // Highlight active nav link based on current page
      const navItems = document.querySelectorAll('.nav-links > li > a');
      const currentPage = window.location.pathname.split("/").pop().toLowerCase() || 'index.html';
      console.log("Current page:", currentPage);
      
      let found = false;
      
      navItems.forEach(item => {
        const href = item.getAttribute('href').toLowerCase();
        console.log("Checking link:", href);
        
        // Check if the current page matches the href or if it's the same page without .html
        if (href === currentPage || 
            href.replace('.html', '') === currentPage.replace('.html', '') ||
            (currentPage === 'contact.html' && href === 'contact.html') ||
            (currentPage === 'portfolio.html' && href === 'portfolio.html') ||
            (currentPage === 'service.html' && href === 'services.html') ||
            (currentPage === 'career.html' && href === 'careers.html')) {
          console.log("Match found for:", href);
          item.classList.add('active');
          found = true;
        }
      });
      
      if (!found && (currentPage === 'index.html' || currentPage === '')) {
        const homeLink = document.querySelector('.nav-links > li > a[href="index.html"]');
        if (homeLink) {
          console.log("Setting home link as active");
          homeLink.classList.add('active');
        }
      }
    }, 100); // Small delay to ensure DOM is updated
  });

// Load Footer
fetch("footer.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  });

// Load Chatbot
fetch("chatBot.html")
  .then((res) => res.text())
  .then((data) => {
    const botDiv = document.getElementById("bot");
    botDiv.innerHTML = data;

    // Re-execute scripts inside the loaded HTML
    botDiv.querySelectorAll("script").forEach((oldScript) => {
      const newScript = document.createElement("script");
      newScript.text = oldScript.text;
      document.body.appendChild(newScript);
    });
  });
