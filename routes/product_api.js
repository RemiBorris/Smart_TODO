const fetch = require('node-fetch');

const isProduct = function (taskName) {

  const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${encodeURIComponent(taskName)}&page=1&country=CA&sort_by=RELEVANCE`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.AMAZON_API_KEY,
      'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
    }
  };

// complete busiess search for taskname through yelp
  fetch(url, options)
    .then(response => response.json())
    .then(response => {
      if (response.data.total_products > 0) {  /*  */
        return true;
      } else {
        return false;
      }
    })
    .catch(err => console.error(err));
}


module.exports = { isProduct };
