require('dotenv').config();
const axios = require('axios');

// this function checks if the book exist.
function isBook(title) {
  const encodedTitle = encodeURIComponent(title);
  const url = `https://openlibrary.org/search.json?title=${encodedTitle}&limit=5`

  return axios.get(url)
    .then(res => {
      const data = res.data;
      if(data.numFound > 0) { //returns true, if matching result is found
        return true;
      } else {
        return false; //return false if nothing is found.
      }
    })
    .catch(error => {
      console.error('Error fetching movie data:', error.message);
      return false;
    });
}

//export module
module.exports = { isBook };

