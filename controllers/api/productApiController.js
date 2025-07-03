const Product = require('../../models/Product');

const getProductsApi = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({errro: 'Error al obtener productos'});
    }
};

const getProductByIdApi = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) return res.status(404).json({error: 'Producto no encontrado'});
        res.json(product);  
    } catch (err) {
        res.status(500).json({error: 'Error al obtener producto'})
    }
};

const createProductApi = async (req, res) => {
  try {
    const data = req.body;
    const newProduct = await Product.create(data);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear producto', details: err.message });
  }
};

const updateProductApi = async (req, res) => {
  try {
    const data = req.body;
    const updated = await Product.findByIdAndUpdate(req.params.productId, data, { new: true });
    if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar producto', details: err.message });
  }
};

const deleteProductApi = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.productId);
    if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};

module.exports.api = {
    getProductsApi,
    getProductByIdApi,
    createProductApi,
    updateProductApi,
    deleteProductApi
};