const express = require('express');
const isBook = require('../../routes/books_api');
const isMovie = require('../../routes/movies_api');
//const isProduct = require('../../routes/product_api');
const isRestaurant = require('../../routes/restaurant_api');

async function autoCategorize(taskName) {

  const result = { category_id: 5 }

  const categoryApis = [
    isMovie.isMovieExists(taskName),
    isBook.isBookExists(taskName),
    isRestaurant.isRestaurantExists(taskName),
    //isProduct(taskName)
  ]

  await Promise.all(categoryApis)
    .then((values) => {
      if (values[0]) {
        return result.category_id = 2;
      } else if (values[1]) {
        return result.category_id = 1;
      } else if (values[2]) {
        return result.category_id = 4;
      }
      // else if (values[3]) {
      //   result.category_id = 3;
      // }
    })

  return result;

  // isBook.isBookExists(taskName)
  // .then((response) => {
  //   if(response) {
  //     result.category_id = 1;
  //     return Promise.resolve(); //continue the chain
  //   } else {
  //     return isMovie.isMovieExists(taskName);
  //   }
  // })
  // .then((response) => {
  //   if(response) {
  //     result.category_id = 2
  //     return Promise.resolve();
  //   } else {
  //     return isRestaurant.isRestaurantExists(taskName);
  //   }
  // })
  // .catch((error) => { console.log("Error Categorizing: ", error.message)})

}

module.exports = { autoCategorize }
