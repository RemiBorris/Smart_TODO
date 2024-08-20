require('dotenv').config();
const axios = require('axios');
const MoviesApiKey = process.env.MoviesApiKey;

// this function checks if the input is a movie //

function isMovieExists(title) {
  //remove 'watch' from title if present
  const cleanedTitle = title.replace(/\bwatch\b/i, '').trim().toLowerCase();
  const encodedTitle = encodeURIComponent(cleanedTitle);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${MoviesApiKey}&query=${encodedTitle}`;

  return axios.get(url)
    .then(res => {
      const data = res.data;

      //ensure search results are valid
      const hasValidResults = data.results && data.results.length > 0;
      if (!hasValidResults) return false;

      const movie = data.results[0];

      //extra checks
      const hasValidTitle = movie.title && movie.title.trim() !== '';
      const hasValidReleaseDate = movie.release_date && movie.release_date.match(/^\d{4}-\d{2}-\d{2}$/);
      const hasMinimumRating = movie.vote_average && movie.vote_average > 0;

      if (hasValidTitle && hasValidReleaseDate && hasMinimumRating) {
        return true;
      }
      return false;
    })
    .catch(error => {
      console.error('Error fetching movie data:', error.message);
      return false;
    });
}

//export module
module.exports = { isMovieExists };
