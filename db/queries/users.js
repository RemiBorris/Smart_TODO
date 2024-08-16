const db = require('../connection');
const bcrypt = require('bcryptjs');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const addUser = function(first_name, last_name, email, password) {

  return bcrypt.hash(password, 10)
    .then(passwordHashed=> {
      const queryString = 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3) RETURNING *';
      const values = [first_name, last_name, email, passwordHashed];

      return db
        .query(queryString, values)
        .then(response => response.rows[0])
        .catch((error) => {
          console.log("addUser error: ", error.message);
          throw error;
        });
    });
};

const getUserWithEmail = function(email) {
  const queryString = 'SELECT * FROM users WHERE email = $1;';
  const values = [email.toLowerCase()];

  return db
    .query(queryString, values)
    .then((response) => {
      return response.rows[0];
    })
    .then((user) => {
      if(user) {
        return { ...user, password: user.password };
      } return null;
    })
    .catch((error) => {
      console.log("getUserWithEmail error: ", error.message);
      throw error;
    });

};

const getUserWithId = function(id) {
  const queryString = 'SELECT * FROM users WHERE id = $1;';
  const values = [id];

  return db
    .query(queryString, values)
    .then((response) => {
      return response.rows[0]; //return as an object.
    })
    .catch((error) => {
      console.log("getUserWithId error: ", error.message);
      throw error;
    });
};

const getUserTasks = (id) => {
  const queryString = 'SELECT * FROM tasks WHERE user_id = $1;'
  const values = [id];

  return db
    .query(queryString, values)
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log("getUserTasks error: ", error.message);
      throw error;
    });
};

module.exports = { getUsers, addUser, getUserWithEmail, getUserWithId,getUserTasks };
