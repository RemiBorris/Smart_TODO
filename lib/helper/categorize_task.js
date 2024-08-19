const express = require('express');
const isBook = require('../../routes/books_api');
const isMovie = require('../../routes/movies_api');
//const isProduct = require('../../routes/product_api');
const isRestaurant = require('../../routes/restaurant_api');

async function autoCategorize(taskName) {

  const result = { category_id: 5 }

  const lowerCaseTaskName = taskName.toLowerCase()

  if (lowerCaseTaskName.startsWith('watch' || 'binge')) {
    return result.category_id = 2
  } else if (lowerCaseTaskName.startsWith('read')) {
    return result.category_id = 1
  } else if (lowerCaseTaskName.startsWith('eat')) {
    return result.category_id = 4
  } else if (lowerCaseTaskName.startsWith('buy' || 'purchase')) {
    return result.category_id = 3
  };

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

}

module.exports = { autoCategorize }
