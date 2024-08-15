// Client facing scripts here
// users task
// Handle browser events

// Add event listener for cancel button

$(() => {
  const taskModalForm = document.getElementById('taskModalForm')

  taskModalForm.addEventListener('show.bs.modal', function (event) {
    // Button that triggered the modal
    const button = event.relatedTarget

    // Extract info from data-bs-* attributes
    const task = JSON.parse(button.getAttribute('data-bs-task'))
    const isUpdate = taskModalForm.querySelector('.modal-content #isUpdate')
    const taskNameInput = taskModalForm.querySelector('.modal-body .taskName')
    const taskDescriptionInput = taskModalForm.querySelector('.modal-body .taskDescription')

    // Update op
    if (task !== null) {
      // If necessary, you could initiate an AJAX request here
      // and then do the updating in a callback.
      //
      // Update the modal's content.
      taskNameInput.value = task.name
      taskDescriptionInput.value = task.description
      isUpdate.value = true
    } else {
      taskNameInput.value = ''
      taskDescriptionInput.value = ''
      isUpdate.value = false
    }
  })
});
