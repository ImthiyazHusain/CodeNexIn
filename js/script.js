fetch("navbar.html")
  .then((res) => res.text())
  .then((data) => {
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
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  });

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
