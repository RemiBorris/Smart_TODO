const db = require('../connection');

const getCategory = () => {
  return db
    .query('SELECT * FROM categories;')
    .then((data) => data.rows)
    .catch((error) => {
      console.log(error.message);
      throw error;
    });
};

module.exports = { getCategory };
