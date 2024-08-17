// Client facing scripts here

// Add event listener for login button
$('#login-btn').on('click', function() {
  window.location.href = '/login'; // Redirect to the login page
});

// Add event listener for signup button
$('#register-btn').on('click', function() {
  window.location.href = '/signup'; // Redirect to the registration page
});
