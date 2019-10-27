const express = require('express');
const path = require('path');
const ProductService = require('../services');
const { strings } = require('../utils/lang/es');
const receipt = '../assets/receipt.pdf';

const platziStore = app => {
  const router = express.Router();
  app.use('/api/', router);

  const productService = new ProductService();

  router.get('/', (req, res) => {
    res.send(`API v2`);
  });

  // eslint-disable-next-line no-unused-vars
  router.get('/receipts', (req, res, next) => {
    let file = path.join(__dirname, receipt);
    res.sendFile(file);
  });

  // eslint-disable-next-line no-unused-vars
  router.get('/products', async (req, res, next) => {
    const storeProducts = await productService.getProducts();
    res.status(200).json(storeProducts);
  });

  // eslint-disable-next-line no-unused-vars
  router.get('/products/:productId', async (req, res, next) => {
    const { productId } = req.params;
    const storeProduct = await productService.getProduct(productId);
    res.status(200).json(storeProduct);
  });

  // eslint-disable-next-line no-unused-vars
  router.post('/products', async (req, res, next) => {
    const { body: product } = req;
    const storeProduct = await productService.createPtoduct(product);
    res.status(201).json({ productId: storeProduct, message: strings.product });
  });

  // eslint-disable-next-line no-unused-vars
  router.put('/products/:productId', async (req, res, next) => {
    const { body: product } = req;
    const { productId } = req.params;
    const updatedProduct = await productService.updatePtoduct(
      productId,
      product
    );
    res
      .status(200)
      .json({ payload: updatedProduct, message: strings.product.updated });
  });

  // eslint-disable-next-line no-unused-vars
  router.delete('/products/:productId', async (req, res, next) => {
    const { productId } = req.params;
    const deletedProduct = await productService.deleteProduct(productId);
    res.status(200).json({
      payload: deletedProduct || productId,
      message: strings.product.deleted
    });
  });

  // eslint-disable-next-line no-unused-vars
  router.post('/lp', async (req, res, next) => {
    const storeProducts = await productService.loadProducts();
    res.status(200).json(storeProducts);
  });

  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
};

module.exports = platziStore;
