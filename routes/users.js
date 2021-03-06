const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

const {
  register, login, getUser, logout,
} = require('../controllers/users');
const render = require('../controllers/render');

const { productGet, getAllProducts } = require('../controllers/products');

const { orderAdd, getOrders } = require('../controllers/orders');

router

  // ------------------Register---------------------//
  .post('/register', register)

  // ------------------Get user by token---------------------//
  .get('/user', auth, getUser)

  // ------------------Login---------------------//
  .post('/login', login, render(200))

  // ------------------Logout---------------------//
  .get('/logout', auth, logout, render(200))

// -----------------Product------------//
// ---------------------------------//

  // ------------------Get Product with id (params)-----------//
  .get('/products/:id', productGet)

  // ------------------Get All Products---------------------//
  .get('/products', getAllProducts)

// ------------------add order by id (params)---------------------//

  .post('/products/:productId/purchase', auth, orderAdd)

  .post('/orders', auth, getOrders);

module.exports = router;
