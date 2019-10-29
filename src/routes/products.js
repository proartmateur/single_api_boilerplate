const { ProductService } = require('../services/products');
const { strings } = require('../utils/lang/es');

const productsRouter = router => {
  const productService = new ProductService();
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
};

module.exports = productsRouter;
