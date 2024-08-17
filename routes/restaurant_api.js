const axios = require('axios');

const isRestaurant = function (taskName) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `${process.env.YELP_API_KEY}`
    }
  }

  // complete busiess search for taskname through yelp
  const url = `https://api.yelp.com/v3/businesses/search?location=toronto&term=${encodeURIComponent(taskName)}&radius=25000&sort_by=best_match&limit=1`

  axios.get(url, options)
    .then(resp => {
      const response = resp.data;

      if (response.businesses[0] && response.businesses[0].attributes.menu_url){  /* Check if a menu exists for the top result to confirm if 1. the business finds a match 2. the business is a restaurant */
        return true;
      } else {
        return false;
      }
    }, _error => {
      return false;
    })
}

module.exports = { isRestaurant };
