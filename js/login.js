const loginForm = document.getElementById("loginForm");
const loginSubmitBtn = document.getElementById("loginSubmitBtn");

// Login form submission
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Validate form
  if (!loginForm.checkValidity()) {
    loginForm.reportValidity();
    return;
  }

  loginSubmitBtn.disabled = true;
  loginSubmitBtn.textContent = "Signing in...";

  // Simulate async login process
  setTimeout(() => {
    alert("Login successful! (This is a simulation)");

    // Here you can set a token or redirect user
    // localStorage.setItem('token', 'demoToken123');
    // window.location.href = 'dashboard.html';

    loginSubmitBtn.disabled = false;
    loginSubmitBtn.textContent = "Login";
    loginForm.reset();
  }, 1500);
});
