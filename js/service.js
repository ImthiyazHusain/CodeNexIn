
  document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll to a target section (you can create a #contact or #form section)
    const getStartedButtons = document.querySelectorAll('.cards button');
    getStartedButtons.forEach(button => {
      button.addEventListener('click', () => {
         window.location.href = 'contact.html';  // add here proper contact.html page 
      });
    });

    // Toggle highlight on service cards when clicked
    const cards = document.querySelectorAll('.cards > div');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        // Remove highlight from all cards
        cards.forEach(c => c.classList.remove('highlight'));
        // Add highlight to clicked card
        card.classList.add('highlight');
      });
    });

    // Alert for consultation and portfolio buttons
    const consultationBtn = document.querySelector('.conslt button:nth-child(3)');
    const portfolioBtn = document.querySelector('.conslt button:nth-child(4)');

    if (consultationBtn) {
      consultationBtn.addEventListener('click', () => {
        alert('Thank you for your interest! We will contact you soon to schedule a consultation.');
        window.location.href ='contact.html';      // add here proper contact.html  page for redirecting
      });
    }

    if (portfolioBtn) {
      portfolioBtn.addEventListener('click', () => {
        // alert('Redirecting to our portfolio page.');
        // Example redirect, change URL as needed
        window.location.href = 'portfolio.html';  //add here proper portfolio.html  page for redirecting
      });
    }
  });

