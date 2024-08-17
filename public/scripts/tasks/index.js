// Client facing scripts here
// users task
// Handle browser events

// Task, index

$(() => {
  const taskModalForm = document.getElementById('taskModalForm');
  const $categorySelect = $('#categories-select');
  const currentCategoryId = $categorySelect[0].dataset.currentCategoryId;

  $('.home-btn').click(function(event) {
    event.preventDefault()
    window.location.href = '/'
  });

  const categoryOption = (category) => {
    console.log("Category: -->>  ", category);
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
        console.table(category);
        $categorySelect.append(categoryOption(category));
      }
    }).fail((_error) => {
      alert("Request Failed!");
    });
  };

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

  $('.home-btn').click(function(event) {
    event.preventDefault()
    window.location.href = '/'
  });



  taskModalForm.addEventListener('show.bs.modal', function (event) {
    // Button that triggered the modal
    const button = event.relatedTarget

    // Extract info from data-bs-* attributes
    const task = JSON.parse(button.getAttribute('data-bs-task'));
    const isUpdate = taskModalForm.querySelector('.modal-content #isUpdate');
    const taskNameInput = taskModalForm.querySelector('.modal-body .taskName'); // _form.ejs
    const taskDescriptionInput = taskModalForm.querySelector('.modal-body .taskDescription');// _form.ejs
    const taskCategory = taskModalForm.querySelector('.modal-body #categories-select');
    const deleteBtn = taskModalForm.querySelector('.modal-body .delete-btn');

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
      deleteBtn.dataset.userId = task.user_id
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
