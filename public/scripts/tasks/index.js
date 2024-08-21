// Client facing scripts here
// users task
// Handle browser events

// Task, index

$(() => {
  const taskModalForm = document.getElementById('taskModalForm');
  const $categorySelect = $('#categories-select');
  const currentCategoryId = $categorySelect[0].dataset.currentCategoryId;
  const currentUser = JSON.parse($('#currentUser').val()); //return as object

  $('.home-btn').click(function(event) {
    event.preventDefault()
    window.location.href = '/'
  });

  const categoryOption = (category) => {
    if (category.id == currentCategoryId) {
      return `<option value="${category.id}" selected>${category.name}</option>`
    } else {
      return `<option value="${category.id}">${category.name}</option>`
    }
  }

  const loadCategories = () => {
    $.ajax({
      method: 'GET',
      url: '/api/categories'
    }).done((response) => {
      $categorySelect.empty();
      for(const category of response.categories) {
        $categorySelect.append(categoryOption(category));
      }
    }).fail((_error) => {
      alert("Request Failed!");
    });
  };
  //Task Status toggle (is_completed === true || is_completed === false)
  $('.task-is-done').click((event) => {
    const task = JSON.parse(event.currentTarget.getAttribute('data-task'));

    $.ajax({
      method: 'POST',
      url: `/api/tasks/${task.id}/updateStatus`,
      dataType: 'json',
      data: { id: task.id, is_completed: !task.is_completed },
    }).done(function(_data) {
      window.location.reload()
    }).fail(function(_data) {
      alert("Request failed");
    });
  });

  $('.delete-btn').click((event) => {
    event.preventDefault();

    $.ajax({
      method: 'DELETE',
      url: `/api/tasks/${event.target.dataset.taskId}`
    }).done((_response) => {
      window.location.href = `/users/${event.target.dataset.userId}/tasks`
    }).fail((_error) => {
      alert("Request Failed");
    })
  });

  const updateTask = (target) => {
    const task = {
      id: target.dataset.taskId,
      category_id: $('#categories-select').val(),
      description: $('.taskDescription').val(),
      name: $('.taskName').val()
    }

    $.ajax({
      method: 'POST',
      url: `/api/tasks/${target.dataset.taskId}`,
      dataType: 'json',
      data: task,
    }).done(function(_data) {
      window.location.reload()
    }).fail(function(_data) {
      alert("Request failed");
    }).always(() => {
      $('#submit-task-btn').attr('disabled', false);
      $('#submit-task-btn').innerHTML = 'Submit';
    });
  }

  const createTask = (target) => {
    const task = {
      id: target.dataset.taskId,
      name: $('.taskName').val(),
      description: $('.taskDescription').val(),
      user_id: currentUser.id
    }

    $.ajax({
      method: 'POST',
      url: `/api/tasks`,
      dataType: 'json',
      data: task,
    }).done(function(_data) {
      window.location.reload()
    }).fail(function(_data) {
      alert("Request failed");
    }).always(() => {
      $('#submit-task-btn').attr('disabled', false);
      $('#submit-task-btn').innerHTML = 'Submit';
    });
  }
  //button eventhandler that saves new task or updated task
  $('.submit-btn').click((event) => {
    event.preventDefault();

    //Preventing empty task input
    const taskName = $('.taskName').val();
    if (taskName.trim() === undefined || taskName.trim() === '') {
      $('.taskName').focus();
      alert('Task name is required');
      return;
    }

    //Preventing spamming the input field
    event.target.disabled = true; //disable the submit btn to prevent spamming the server for multiple request.
    event.target.innerHTML = 'Submitting....'

    const isUpdate = $('#isUpdate').val() === 'true';

    if (isUpdate) {
      updateTask(event.target)
    } else {
      createTask(event.target)
    }
  });

  $('.edit-user-btn').click((event) => {
    event.preventDefault();
    const user = {
      id: event.target.dataset.userId,
      first_name: $('.firstName').val(),
      last_name: $('.lastName').val(),
      email: $('.email').val()
    }

    $.ajax({
      method: 'POST',
      url: `/api/users/${event.target.dataset.userId}`,
      dataType: 'json',
      data: user,
    }).done(function(_data) {
      window.location.reload()
    }).fail(function(_data) {
      alert("Request failed");
    });

  })

  //Update User modal
  userModalForm.addEventListener('show.bs.modal', function(event) {
    // Button that triggered the modal
    const button = event.relatedTarget

    // Extract info from data-bs-* attributes
    const user = JSON.parse(button.getAttribute('data-user'));
    const firstNameInput = userModalForm.querySelector('.modal-body .firstName'); // _form.ejs
    const lastNameInput = userModalForm.querySelector('.modal-body .lastName');// _form.ejs
    const emailInput = userModalForm.querySelector('.modal-body .email');
    const editUserBtn= userModalForm.querySelector('.modal-body .edit-user-btn');

    // Update user info
    firstNameInput.value = user.first_name;
    lastNameInput.value = user.last_name;
    emailInput.value = user.email;
    editUserBtn.dataset.userId = user.id;
  })

  // Update task modal
  taskModalForm.addEventListener('show.bs.modal', function (event) {
    // Button that triggered the modal
    const button = event.relatedTarget

    // Extract info from data-bs-* attributes
    const task = JSON.parse(button.getAttribute('data-task'));
    const isUpdate = taskModalForm.querySelector('.modal-content #isUpdate');
    const taskNameInput = taskModalForm.querySelector('.modal-body .taskName'); // _form.ejs
    const taskDescriptionInput = taskModalForm.querySelector('.modal-body .taskDescription');// _form.ejs
    const taskCategory = taskModalForm.querySelector('.modal-body #categories-select');
    const deleteBtn = taskModalForm.querySelector('.modal-body .delete-btn');
    const submitBtn = taskModalForm.querySelector('.modal-body .submit-btn');

    // Update user's task
    if (task !== null) {
      // If necessary, you could initiate an AJAX request here
      // and then do the updating in a callback.
      //
      // Update the modal's content.
      taskNameInput.value = task.name
      taskDescriptionInput.value = task.description
      isUpdate.value = true
      taskCategory.value = task.category_id;
      deleteBtn.dataset.taskId = task.id;
      deleteBtn.dataset.userId = task.user_id;
      submitBtn.dataset.taskId = task.id;
      submitBtn.dataset.userId = task.user_id
      $('.category-dropdown, .delete-btn').show();
    } else { // Add a new task
      taskNameInput.value = ''
      taskDescriptionInput.value = ''
      isUpdate.value = false
      $('.category-dropdown, .delete-btn').hide();
    }
  });

  loadCategories();
});
