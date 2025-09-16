 // Elements
    const loginForm = document.getElementById('loginForm');
    const signUpForm = document.getElementById('signUpForm');
    const showSignUpBtn = document.getElementById('showSignUpBtn');
    const showLoginBtn = document.getElementById('showLoginBtn');
    const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');

    const loginSubmitBtn = document.getElementById('loginSubmitBtn');
    const signUpSubmitBtn = document.getElementById('signUpSubmitBtn');

    // Show Sign Up form, hide Login form
    showSignUpBtn.addEventListener('click', () => {
      loginForm.classList.add('hidden');
      signUpForm.classList.remove('hidden');
      clearForm(loginForm);
    });

    // Show Login form, hide Sign Up form
    showLoginBtn.addEventListener('click', () => {
      signUpForm.classList.add('hidden');
      loginForm.classList.remove('hidden');
      clearForm(signUpForm);
    });

    // Forgot password button
    // forgotPasswordBtn.addEventListener('click', () => {
    //   alert('Redirecting to password reset page (simulation).');
    // });

    // Clear form inputs and validation states
    function clearForm(form) {
      form.reset();
      // Remove any validation messages if needed
    }

    // Login form submission
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!loginForm.checkValidity()) {
        loginForm.reportValidity();
        return;
      }

      loginSubmitBtn.disabled = true;
      loginSubmitBtn.textContent = 'Signing in...';

      // Simulate async login process
      setTimeout(() => {
        alert('Login successful! (This is a simulation)');
        loginSubmitBtn.disabled = false;
        loginSubmitBtn.textContent = 'Sign in';
        loginForm.reset();
      }, 1500);
    });

    // Sign Up form submission
    signUpForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!signUpForm.checkValidity()) {
        signUpForm.reportValidity();
        return;
      }

      signUpSubmitBtn.disabled = true;
      signUpSubmitBtn.textContent = 'Signing up...';

      // Simulate async sign up process
      setTimeout(() => {
        alert('Account created successfully! (This is a simulation)');
        signUpSubmitBtn.disabled = false;
        signUpSubmitBtn.textContent = 'Sign up';
        signUpForm.reset();

        // Switch to login form after sign up
        signUpForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
      }, 1500);
    });