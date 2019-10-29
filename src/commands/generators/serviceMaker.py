from lib import *

def serviceMaker(item):
    className = plural(item.capitalize())
    classNameSingular = item.capitalize()
    itemName = plural(item)
    template = """const { """+itemName+"""Mock } = require('../utils/mocks/"""+itemName+"""');
const MongoConnect = require('../lib/mongo');

"""
    template += """class """+classNameSingular+"""Service {
  constructor() {
    this.collection = '"""+itemName+"""';
    this.mongoDB = new MongoConnect();
  }
"""

    template += """
  async get"""+className+"""() {
    const """+itemName+""" = await this.mongoDB.getAll(this.collection);
    return """+itemName+""" || [];
  }

  async get"""+classNameSingular+"""(id) {
    const """+item+""" = await this.mongoDB.get(this.collection, id);
    return """+item+""" || {};
  }

  async create"""+classNameSingular+"""(data) {
    const """+item+""" = await this.mongoDB.create(this.collection, data);
    return """+item+""" || {};
  }

  async update"""+classNameSingular+"""(id, data) {
    const """+item+""" = await this.mongoDB.update(this.collection, id, data);
    return """+item+""" || {};
  }

  async delete"""+classNameSingular+"""(id) {
    const """+item+""" = await this.mongoDB.delete(this.collection, id);
    return """+item+""" || {};
  }

  async load"""+className+"""() {
    const """+itemName+""" = await Promise.resolve("""+itemName+"""Mock);
    const iterProd = """+itemName+""".map(async item => {
      try {
        await this.mongoDB.create(this.collection, item);
      } catch (err) {
        if (err.code === 11000) {
          console.log('Error:', 'El """+item+""" ya existe');
        }
      }
      return iterProd;
    });
    return { payload: iterProd };
  }
}

module.exports = { """+classNameSingular+"""Service };
"""
    return template