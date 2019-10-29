const express = require('express');
const path = require('path');
const receipt = '../assets/receipt.pdf';

const usersRouter = require('./users');
const productsRouter = require('./products');

const platziStore = app => {
  const router = express.Router();
  app.use('/api/', router);

  usersRouter(router);
  productsRouter(router);

  router.get('/', (req, res) => {
    res.send(`API v2`);
  });

  // eslint-disable-next-line no-unused-vars
  router.get('/receipts', (req, res, next) => {
    let file = path.join(__dirname, receipt);
    res.sendFile(file);
  });

  // eslint-disable-next-line no-unused-vars
  /* router.post('/lp', async (req, res, next) => {
    console.log('Loading Products:...');
    const storeProducts = await productService.loadProducts();
    res.status(200).json(storeProducts);
  }); */

  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
};

module.exports = platziStore;
