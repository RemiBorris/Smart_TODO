require('dotenv').config();
const axios = require('axios');
const MoviesApiKey = process.env.MoviesApiKey;

// this function checks if the input is a movie //
function isMovieExists(title) {
  //remove 'watch' from title if present
  const cleanedTitle = title.replace(/\bwatch\b/i, '').trim();
  const encodedTitle = encodeURIComponent(cleanedTitle);

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${MoviesApiKey}&query=${encodedTitle}`;


  return axios.get(url)
  .then(res => {
    const data = res.data;
    const movie = data.results[0].title;

    if (movie.toLowerCase() == cleanedTitle.toLowerCase()) {
      console.log("MOVIE LINE 24 TRUE: ");
      return true;
    } else {
      console.log("MOVIE FALSE: ");
      return false;
    }
    // if (data.results && data.results.length > 0) {
    //   return true;
    // } else {
    //   return false;
    // }
  })
  .catch(error => {
    console.error('Error fetching movie data:', error.message);
    return false;
  });
}

module.exports = { isMovieExists };

