const express = require('express');
const isBook = require('../../routes/books_api');
const isMovie = require('../../routes/movies_api');
const isProduct = require('../../routes/product_api');
const isRestaurant = require('../../routes/restaurant_api');

async function autoCategorize(taskName) {

  const result = { category_id: 5 }
  const lowerCaseTaskName = taskName.toLowerCase();

  const categoryApis = [
    isMovie.isMovieExists(taskName),
    isBook.isBookExists(taskName),
    isRestaurant.isRestaurantExists(taskName),
    isProduct.isProduct(taskName)
  ]

  switch (true) {
    case (lowerCaseTaskName.startsWith('watch') || lowerCaseTaskName.startsWith('to watch')):
      result.category_id = 2
      break;
    case (lowerCaseTaskName.startsWith('read') || lowerCaseTaskName.startsWith('to read')):
      result.category_id = 1
      break;
    case (lowerCaseTaskName.startsWith('eat') || lowerCaseTaskName.startsWith('to eat')):
      result.category_id = 4
      break;
    case (lowerCaseTaskName.startsWith('buy') || lowerCaseTaskName.startsWith('to buy')) || lowerCaseTaskName.startsWith('purchase') || lowerCaseTaskName.startsWith('to purchase'):
      result.category_id = 3;
      break;
    default:
      await Promise.all(categoryApis)
      .then((values) => {
        if (values[0]) {
          return result.category_id = 2;
        } else if (values[1]) {
          return result.category_id = 1;
        } else if (values[2]) {
          return result.category_id = 4;
        }
        else if (values[3]) {
          result.category_id = 3;
        }
      })
      break;
  }
  


  return result;

}

module.exports = { autoCategorize }
