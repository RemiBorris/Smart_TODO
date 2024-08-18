const axios = require('axios');

const isRestaurantExists = function (taskName) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `${process.env.YELP_API_KEY}`
    }
  }

  // complete busiess search for taskname through yelp
  const url = `https://api.yelp.com/v3/businesses/search?location=toronto&term=${encodeURIComponent(taskName)}&radius=25000&sort_by=best_match&limit=10`

  axios.get(url, options)
    .then(resp => {
      const data = resp.data;
      const restaurant = data.businesses[0].name;
      console.log(restaurant);
      if (restaurant.includes(taskName)) {
        console.log(restaurant);
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.error('Error fetching restaurant data:', error.message);
      return false;
    });

    //   if (response.businesses[0] && response.businesses[0].attributes.menu_url){  /* Check if a menu exists for the top result to confirm if 1. the business finds a match 2. the business is a restaurant */
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }, _error => {
    //   return false;
    // })
}

module.exports = { isRestaurantExists };

isRestaurantExists("Korean Grill")
