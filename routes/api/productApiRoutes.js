const expressApi = require('express');
const apiRouter = expressApi.Router();
const { api: apiController } = require('../../controllers/api/productApiController');

apiRouter.get('/products', apiController.getProductsApi);
apiRouter.get('/products/:productId', apiController.getProductByIdApi);
apiRouter.post('/products', apiController.createProductApi);
apiRouter.put('/products/:productId', apiController.updateProductApi);
apiRouter.delete('/products/:productId', apiController.deleteProductApi);

module.exports = apiRouter;