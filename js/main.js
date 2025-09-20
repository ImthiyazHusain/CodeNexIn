// js/main.js

// Load Navbar
fetch("navbar.html")
  .then((res) => res.text())
  .then((data) => {
    const navbarDiv = document.getElementById("navbar");
    navbarDiv.innerHTML = data;
    initNavbar(); // call navbar.js function after injection
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
