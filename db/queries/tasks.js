const db = require('../connection');

// C = create/add a new task to do. Insert.
const createTask = function(task) {
  const queryString = 'INSERT INTO tasks (user_id, name, description,category_id, is_completed) VALUES ($1, $2, $3, $4, $5) RETURNING *;';

  const values = [task.userId, task.name, task.description, task.category_id];

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

//Task done
const taskDone = (taskId) => {
  return db
    .query('UPDATE tasks SET is_completed = true WHERE id = $1 RETURNING *;', [taskId])
    .then((result) => {
      if (result.rows.length > 0) {
        return result.rows;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });

}

module.exports = {createTask, getTask, updateTask, deleteTask, getAllTask, getTaskWithUserId, taskDone};

