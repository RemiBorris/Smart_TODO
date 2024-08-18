require('dotenv').config();
const axios = require('axios');

// this function checks if the book exist.
function isBookExists(title) {
  const encodedTitle = encodeURIComponent(title);
  //const url = `https://openlibrary.org/search.json?title=${encodedTitle}&limit=10`
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodedTitle}`

  return axios.get(url)
    .then(res => {
      //const data = res.data;
      // if(data.numFound > 0) { //returns true, if matching result is found
      //   return true;
      // } else {
      //   return false; //return false if nothing is found.
      // }
      // const data = res.data

      // const book = data.find((element) => { element.title === title })
      //const data = res.items;
      //const data = resJSON.parse(res).items[0].volumeInfo.title;

     // console.log(res.data);
      const data = res.data.items[0].volumeInfo.title

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

//export module
module.exports = { isBookExists };

//isBookExists("To kill a mockingbird");

