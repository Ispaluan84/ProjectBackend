const express = require('express');
const router = express.Router();
const {
  showProducts,
  showNewProduct,
  createProduct,
  showProductById,
  showEditProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

router.get('/products', showProducts);
router.get('/products/new', showNewProduct);
router.post('/products', createProduct);
router.get('/products/:productId', showProductById);
router.get('/products/:productId/edit', showEditProduct);
router.put('/products/:productId', updateProduct);
router.delete('/products/:productId', deleteProduct);

router.get('/', showProducts);

module.exports = router;