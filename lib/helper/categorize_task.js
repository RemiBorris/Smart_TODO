const express = require('express');
const { isBook } = require('../../routes/books_api');
const { isMovie } = require('../../routes/movies_api');
const { isProduct } = require('../../routes/product_api');
const { isRestaurant } = require('../../routes/restaurant_api');

async function autoCategorize(taskName) {
  const result = { category_id: 5 }
  const categoryApis = [
    isMovie(taskName),
    isBook(taskName),
    isRestaurant(taskName),
    isProduct(taskName)
  ]

  await Promise.all(categoryApis)
    .then((values) => {
      if (values[0]) {
        result.category_id = 2;
      } else if (values[1]) {
        result.category_id = 1;
      } else if (values[2]) {
        result.category_id = 4;
      } else if (values[3]) {
        result.category_id = 3;
      } else {
        result;
      }
    })

  return result
}

module.exports = { autoCategorize }
