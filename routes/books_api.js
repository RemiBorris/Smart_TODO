require('dotenv').config();
const axios = require('axios');

// Function that find books if it exist.
function isBookExists(title) {
  const encodedTitle = encodeURIComponent(title);
  //const url = `https://openlibrary.org/search.json?title=${encodedTitle}&limit=10`
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodedTitle}`

  return axios.get(url)
    .then(res => {
      const data = res.data.items[0].volumeInfo.title
      console.log("BOOK: ", data)
      if(data.toLowerCase() == title.toLowerCase()) {
        console.log("BOOK TRUE:", data);
        return true;
      } else {
        console.log("BOOK FALSE");
        return false;
      }
    })
    .catch(error => {
      console.error('Error fetching book data:', error.message);
      return false;
    });
}

module.exports = { isBookExists };


