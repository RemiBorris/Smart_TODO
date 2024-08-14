const fetch = require('node-fetch');

const confirmRestaurant = function (taskName) {

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ZveMf7bJu2rZ5J6FNIX-irwmtrzMUP-8CGnFjiIHw-ZKV6H_A_U0t7E7XSg3vnlASv3CRxeYEVPKai2hyX95WKpOaZyoKm62U_J6540g6KJHoZFR9rDfyimo4e28ZnYx'
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
