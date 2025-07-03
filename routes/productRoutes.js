const express = require('express');
const routerInit =(upload, cloudinary) => {
const router = express.Router();
const controller = require('../controllers/productController');

router.use((req, res, next) => {req.cloudinary = cloudinary; next(); });
router.get('/products', controller.showProducts);
router.get('/products/new', controller.showNewProduct);
router.post('/products', controller.createProduct);
router.get('/products/:productId', controller.showProductById);
router.get('/products/:productId/edit', controller.showEditProduct);
router.put('/products/:productId', controller.updateProduct);
router.delete('/products/:productId', controller.deleteProduct);
router.get('/', controller.showProducts);

return router
};

module.exports = routerInit;