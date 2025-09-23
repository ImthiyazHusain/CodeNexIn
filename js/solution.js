document.addEventListener('DOMContentLoaded', () => {
  // More reliable selectors: target buttons by their text content
  const contactBtn = document.querySelector('.soln3 button');
  const backHomeBtn = document.querySelector('.soln3 button:nth-of-type(2)'); // Second button

  // Fallback to your original selectors if needed
  if (!contactBtn) {
    const contactBtnFallback = document.querySelector('.soln3 button:nth-child(3)');
    if (contactBtnFallback) contactBtn = contactBtnFallback;
  }
  if (!backHomeBtn) {
    const backHomeBtnFallback = document.querySelector('.soln3 button:nth-child(4)');
    if (backHomeBtnFallback) backHomeBtn = backHomeBtnFallback;
  }

  if (contactBtn && contactBtn.textContent.includes('Contact Us')) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault(); 
      window.location.href = 'contact.html'; // Or './contact.html' if needed
    });
  } else {
    console.error('Contact button not found!'); // Debug: Check console
  }

  if (backHomeBtn && backHomeBtn.textContent.includes('Back to Home')) {
    backHomeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Use relative path - adjust as needed
      console.log('Redirecting to home.html...'); // Debug log
      window.location.href = 'home.html'; // Or './home.html' or '../home.html'
    });
  } else {
    console.error('Back to Home button not found!'); // Debug: Check console
  }
});
