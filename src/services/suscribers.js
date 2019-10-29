const { suscribersMock } = require('../utils/mocks/suscribers');
const MongoConnect = require('../lib/mongo');

class SuscriberService {
  constructor() {
    this.collection = 'suscribers';
    this.mongoDB = new MongoConnect();
  }

  async getSuscribers() {
    const suscribers = await this.mongoDB.getAll(this.collection);
    return suscribers || [];
  }

  async getSuscriber(id) {
    const suscriber = await this.mongoDB.get(this.collection, id);
    return suscriber || {};
  }

  async createSuscriber(data) {
    const suscriber = await this.mongoDB.create(this.collection, data);
    return suscriber || {};
  }

  async updateSuscriber(id, data) {
    const suscriber = await this.mongoDB.update(this.collection, id, data);
    return suscriber || {};
  }

  async deleteSuscriber(id) {
    const suscriber = await this.mongoDB.delete(this.collection, id);
    return suscriber || {};
  }

  async loadSuscribers() {
    const suscribers = await Promise.resolve(suscribersMock);
    const iterProd = suscribers.map(async item => {
      try {
        await this.mongoDB.create(this.collection, item);
      } catch (err) {
        if (err.code === 11000) {
          console.log('Error:', 'El suscriber ya existe');
        }
      }
      return iterProd;
    });
    return { payload: iterProd };
  }
}

module.exports = { SuscriberService };
