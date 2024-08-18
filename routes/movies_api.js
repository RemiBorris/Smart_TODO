require('dotenv').config();
const axios = require('axios');
const MoviesApiKey = process.env.MoviesApiKey;


// this function checks if the input is a movie //

function isMovie(title) {
  //remove 'watch' from title if present
  const cleanedTitle = title.replace(/\bwatch\b/i, '').trim();
  const encodedTitle = encodeURIComponent(cleanedTitle);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${MoviesApiKey}&query=${encodedTitle}`;
  return axios.get(url)
  .then(res => {
    const data = res.data;
    if (data.results && data.results.length > 0) {
      return true;
    } else {
      return false;
    }
  })
  .catch(error => {
    console.error('Error fetching movie data:', error.message);
    return false;
  });
}


//export module
module.exports = { isMovie };
