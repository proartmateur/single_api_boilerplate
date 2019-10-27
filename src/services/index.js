const { productsMock } = require('../utils/mocks');
const MongoConnect = require('../lib/mongo');

class ProductService {
  constructor(){
    this.collection = 'products',
    this.mongoDB = new MongoConnect();
  }
  async getProducts() {
    //const my_conn = await conn.connect()

    const products = await this.mongoDB.getAll(this.collection);
    return products || [];
  }

  async loadProducts(){
    const products = await Promise.resolve(productsMock);
    const iterProd = products.map(async (item)=>{
      try{

        await this.mongoDB.create(this.collection,item)
      }catch(err){
        if(err.code === 11000){
          console.log("Error:", "El producto ya existe")

        }
      }
      return item.id
    })
    return {te:1}
    
  }
}

module.exports = ProductService;
