const db = require('../connection');

const getCategories = () => {
  return db
    .query('SELECT * FROM categories;')
    .then((data) => data.rows)
    .catch((error) => {
      console.log(error.message);
      throw error;
    });
};

module.exports = { getCategories };
