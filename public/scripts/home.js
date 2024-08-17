// Client facing scripts here
//Main page

// Add event listener for login button
$('#login-btn').on('click', function() {
  window.location.href = 'sessions/login'; // Redirect to the login page
});

// Add event listener for signup button
$('#register-btn').on('click', function() {
  window.location.href = '/register'; // Redirect to the registration page
});


$(() => {
  $.ajax({
    method: 'GET',
    url: '/api/users'
  })
  .done((response) => {
    const $usersList = $('#users');

    for(const user of response.users) {
      console.table(user);
      $(`<li><a class="dropdown-item" href="/users/${user.id}/tasks"> ${user.email}</a></li>`).appendTo($usersList);
    }
  });
});
