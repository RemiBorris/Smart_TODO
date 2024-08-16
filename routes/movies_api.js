require('dotenv').config();
const axios = require('axios');
const MoviesApiKey = process.env.MoviesApiKey;


//MOVIE API FUNCTION//

function isMovie(title) {
  const encodedTitle = encodeURIComponent(title);
  const url = `http://www.omdbapi.com/?apikey=${MoviesApiKey}&t=${encodedTitle}`

  return axios.get(url)
    .then(res => {
      const data = res.data;
       // Additional checks
       const hasValidResponse = data.Response === 'True';
       const isMovieType = data.Type === 'movie';
       const hasValidYear = data.Year && data.Year.match(/^\d{4}$/); // Ensures it's a 4-digit year
       const hasValidGenre = data.Genre && data.Genre.match(/(Action|Drama|Comedy|Adventure|Horror|Thriller)/i);
       const hasMinimumRating = data.imdbRating && parseFloat(data.imdbRating) > 0;
       const hasDirector = data.Director && data.Director !== 'N/A';
       const hasPlot = data.Plot && data.Plot !== 'N/A';

      if (
        hasValidResponse &&
        isMovieType &&
        hasValidYear &&
        hasValidGenre &&
        hasMinimumRating &&
        hasDirector &&
        hasPlot
      ) {
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




// Test cases
const testCases = [
  { title: "Inception", expected: true },
  { title: "Unknown Movie Title", expected: false },
  { title: "The Godfather", expected: true },
  { title: "RandomTitle123", expected: false },
  { title: "Avatar", expected: true }
];

testCases.forEach(async (testCase) => {
  const result = await isMovie(testCase.title);
  console.log(`Testing" ${testCase.title}: Expected ${testCase.expected}, got ${result}`);
});
