require('dotenv').config();
const axios = require('axios');
const YELP_API_KEY = process.env.YELP_API_KEY;
// const axios = require('axios');


const isRestaurantExists = function (taskName) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `${process.env.YELP_API_KEY}`
    }
  }

  // complete busiess search for taskname through yelp
  //const url = `https://api.yelp.com/v3/businesses/search?location=Canada&term=${encodeURIComponent(taskName)}&sort_by=best_match&limit=5`
  const url = `https://api.yelp.com/v3/businesses/search?location=toronto&term=${encodeURIComponent(taskName)}&radius=25000&sort_by=best_match&limit=2`

  axios.get(url, options)
    .then(resp => {
      const data = resp.data;
      console.log(data);
      const restaurant = data.businesses;
      let result = null;

      if(restaurant.length > 0) {
        result = restaurant[0].name
      }

      if (restaurant[0].attributes.menu_url !== null) {
        console.log("REST TRUE: ", restaurant[0])
        return true;
      } else {
        console.log("REST FALSE")
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

//isRestaurantExists("Tim Hortons");
