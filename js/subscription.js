document.querySelector('.subscription-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const emailInput = document.querySelector('#email');
    const email = emailInput.value;
  
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    // Add code for handling the subscription
    console.log('Email submitted:', email);
    emailInput.value = '';
  
    showPopup('subscription-success-popup');
  });
  
  function validateEmail(email) {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  }
  
  function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = 'block';
  
    // Close the popup when the user clicks the close button or anywhere outside the content area
    const closeButton = popup.querySelector('.close-popup');
    closeButton.onclick = () => { popup.style.display = 'none'; };
    window.onclick = (event) => {
      if (event.target === popup) {
        popup.style.display = 'none';
      }
    };
  }