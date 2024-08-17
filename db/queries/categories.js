const db = require('../connection');

const getCategories = () => {
  return db
    .query('SELECT * FROM categories;')
    .then((data) => data.rows) //return as an array of object
    .catch((error) => {
      console.log("getCategories error: ", error.message);
      throw error;
    });
};

module.exports = { getCategories };
