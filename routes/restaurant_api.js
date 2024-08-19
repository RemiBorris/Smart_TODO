require('dotenv').config();
const fetch = require('node-fetch');

const isRestaurantExists = function (taskName) {

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: process.env.YELP_API_KEY
  }
};
// complete busiess search for taskname through yelp
  fetch(`https://api.yelp.com/v3/businesses/search?location=toronto&term=${encodeURIComponent(taskName)}&radius=25000&sort_by=best_match&limit=1`, options)
    .then(response => response.json())
    .then(response => {
      if (response.businesses[0].attributes.menu_url) {  /* Check if a menu exists for the top result to confirm if 1. the business finds a match 2. the business is a restaurant */
        return true;
      } else {
        return false;
      }
    })
    .catch(err => console.error(err));
}

module.exports = { isRestaurantExists };
