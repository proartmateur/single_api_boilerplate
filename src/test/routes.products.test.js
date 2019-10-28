const assert = require('assert');
const proxyquire = require('proxyquire');

const { productsMock, ProductService } = require('../utils/mocks');

const testServer = require('../utils/testServer');

describe('routes - products', function () {
    const route = proxyquire('../routes/index', {
        '../services':ProductService
    })

    const request = testServer(route);

    describe('GET /products', function () {
        it('should respond with status 200', function(done){
            request.get('/api/products/').expect(200, done);
        });

        it('should respont with the list of movies', function(done){
            request.get('/api/products').end((err, res) =>{
                assert.deepEqual(res.body, productsMock)
            })
            done();
        })
    });
});