const db = require('../connection');

// C = create/add a new task to do. Insert.
const create = function(task) {
  const queryString = 'INSERT INTO tasks (user_id, name, description,category_id) VALUES ($1, $2, $3, $4) RETURNING *;';
  console.table(task)
  const values = [task.user_id, task.name, task.description, task.category_id];

  return db.query(queryString, values).then((response) => response.rows[0]).catch((error) => {
    console.log("create Task error: ", error.message);
    throw error;
  });
};

// R = retrieve / get task. SELECT
const getTask = (taskId) => {
  const queryString = 'SELECT tasks.* FROM tasks INNER JOIN categories ON categories.id = tasks.category_id WHERE tasks.id = $1;';
  const values = [taskId];

  return db.query(queryString, values).then((response) => response.rows[0]).catch((error) => {
    console.log("getTask Error: ", error.message);
    throw error;
  })
}
// U = update/edit task. Update.
const updateTask = (task) => {
  const queryString = 'UPDATE tasks SET name = $1, description = $2, category_id = $3 WHERE id = $4 RETURNING *;';

  const values = [task.name, task.description, task.category_id, task.id];

  return db.query(queryString, values).then((response) => response.rows[0]).catch((error) => { console.log("update Task Error: ", error.message);
    throw error;
  })
};

// D = delete
const deleteTask = (taskId) => {
  return db
    .query('DELETE FROM tasks WHERE tasks.id = $1;', [taskId])
    .then(response => response.rows[0])
    .catch((error) => {
    console.log("deleteTask error: ", error.message);
    throw error;
  });
};

//Function to generate all tasks
const getAllTask = () => {
  return db.query('SELECT * FROM tasks;').then((response) => { return response.rows[0]; }).catch(error => console.log("getAllTask error: ", error.message));
};

//Function that retrieves task by UserId
const getTaskWithUserId = (userId) => {
  return db.query('SELECT * FROM tasks WHERE user_id = $1;', [userId]);
}

//Task status (is_complete)
const updateStatus = (task) => {
  return db.query('UPDATE tasks SET is_completed = $1 WHERE id = $2 RETURNING *;', [task.is_completed, task.id]).then((response) => response.rows[0]).catch((error) => { console.log("update Task Error: ", error.message);
    throw error;
  })
}

module.exports = {create, getTask, updateTask, deleteTask, getAllTask, getTaskWithUserId, updateStatus};

