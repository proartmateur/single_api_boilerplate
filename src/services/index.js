const { productsMock } = require('../utils/mocks');
const MongoConnect = require('../lib/mongo');

class ProductService {
  constructor() {
    this.collection = 'products';
    this.mongoDB = new MongoConnect();
  }
  async getProducts() {
    const products = await this.mongoDB.getAll(this.collection);
    return products || [];
  }

  async getProduct(id) {
    const product = await this.mongoDB.get(this.collection, id);
    return product || {};
  }

  async createPtoduct(data) {
    const product = await this.mongoDB.create(this.collection, data);
    return product || {};
  }

  async updatePtoduct(id, data) {
    const product = await this.mongoDB.update(this.collection, id, data);
    return product || {};
  }

  async deleteProduct(id) {
    const product = await this.mongoDB.delete(id);
    return product || {};
  }

  async loadProducts() {
    const products = await Promise.resolve(productsMock);
    const iterProd = products.map(async item => {
      try {
        await this.mongoDB.create(this.collection, item);
      } catch (err) {
        if (err.code === 11000) {
          console.log('Error:', 'El producto ya existe');
        }
      }
      return iterProd;
    });
    return { payload: iterProd };
  }
}

module.exports = ProductService;
