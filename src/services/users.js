const { usersMock } = require('../utils/mocks/users');
const MongoConnect = require('../lib/mongo');

class UserService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoConnect();
  }

  async getUsers() {
    const users = await this.mongoDB.getAll(this.collection);
    return users || [];
  }

  async getUser(id) {
    const user = await this.mongoDB.get(this.collection, id);
    return user || {};
  }

  async createUser(data) {
    const user = await this.mongoDB.create(this.collection, data);
    return user || {};
  }

  async updateUser(id, data) {
    const user = await this.mongoDB.update(this.collection, id, data);
    return user || {};
  }

  async deleteUser(id) {
    const user = await this.mongoDB.delete(this.collection, id);
    return user || {};
  }

  async loadUsers() {
    const users = await Promise.resolve(usersMock);
    const iterProd = users.map(async item => {
      try {
        await this.mongoDB.create(this.collection, item);
      } catch (err) {
        if (err.code === 11000) {
          console.log('Error:', 'El user ya existe');
        }
      }
      return iterProd;
    });
    return { payload: iterProd };
  }
}

module.exports = { UserService };
