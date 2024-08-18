require('dotenv').config();
const axios = require('axios');
const MoviesApiKey = process.env.MoviesApiKey;


//MOVIE API FUNCTION//

function isMovieExists(title) {
  const encodedTitle = encodeURIComponent(title);
  const url = `http://www.omdbapi.com/?apikey=${MoviesApiKey}&t=${encodedTitle}`

  return axios.get(url)
    .then(res => {
      const data = res.data;
      const movie = data.Title;
      console.log(movie)
       // Additional checks
      //  const hasValidResponse = data.Response === 'True';
      //  const isMovieExistsType = data.Type === 'movie';
      //  const hasValidYear = data.Year && data.Year.match(/^\d{4}$/); // Ensures it's a 4-digit year
      //  const hasValidGenre = data.Genre && data.Genre.match(/(Action|Drama|Comedy|Adventure|Horror|Thriller)/i);
      //  const hasMinimumRating = data.imdbRating && parseFloat(data.imdbRating) > 0;
      //  const hasDirector = data.Director && data.Director !== 'N/A';
      //  const hasPlot = data.Plot && data.Plot !== 'N/A';

      if (
        // hasValidResponse &&
        // isMovieExistsType &&
        // hasValidYear &&
        // hasValidGenre &&
        // hasMinimumRating &&
        // hasDirector &&
        // hasPlot
        movie == title
      ) {
        console.log("MOVIE TRUE");
        return true;
      } else {
        console.log("MOVIE FAlse")
        return false;
      }
    })
    .catch(error => {
      console.error('Error fetching movie data:', error.message);
      return false;
    });
}

//export module
module.exports = { isMovieExists };

// isMovieExists("How to Kill a Mocking bird")
