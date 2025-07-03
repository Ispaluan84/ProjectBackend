const Product = require('../models/Product');
const renderPage = require('../helpers/template');

const getProductCards = (products) => products.map(p => `
  <div class="product-card">
    <img src="${p.image}" alt="${p.name}" width="150">
    <h2>${p.name}</h2>
    <p>${p.description}</p>
    <p><strong>${p.price}€</strong></p>
    <a href="/products/${p._id}">Ver detalle</a>
  </div>
  `).join('');

const showProducts = async (req, res) => {
    try {
        const products = await Product.find();
        const body = `
        <h1>Todos los productos</h1>
        <div class="products-grid">
          ${getProductCards(products)}
        </div>
        `;
        res.send(renderPage('Productos', body, 'home'));
    } catch (err) {
        const errorBody = `<p>Error al cargar el producto.</p>`;
        res.status(500).send(renderPage('Error', errorBody, ''));
    }
};

const showNewProduct = (req, res) => {
  const formHtml = `
  <h1>Nuevo Producto</h1>
    <form action="/products" method="POST" enctype="multipart/form-data" class="product-form">
      <div class="form-group"><label for="name">Nombre:</label><input id="name" name="name" required /></div>
      <div class="form-group"><label for="description">Descripción:</label><textarea id="description" name="description" required></textarea></div>
      <div class="form-group"><label for="image">Imagen:</label><input type="file" id="image" name="image" accept="image/*" required /></div>
      <div class="form-group"><label for="category">Categoría:</label><select id="category" name="category" required><option>Camisetas</option><option>Pantalones</option><option>Zapatos</option><option>Accesorios</option></select></div>
      <div class="form-group"><label for="size">Talla:</label><select id="size" name="size" required><option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option></select></div>
      <div class="form-group"><label for="price">Precio:</label><input type="number" id="price" name="price" step="0.01" required /></div>
      <button type="submit">Crear</button>
    </form>`
  res.send(renderPage('Nuevo roducto', formHtml, ''));
};

const createProduct = async (req, res) => {
  try {
    const { name, description, image, category, size, price } = req.body;
    const uploadResult = await req.cloudinary.uploader.upload_stream({ name, description, image, category, size, price }, (error, result) => {
      if(error) throw error;
      return result;
    }).end (req.file.buffer);
    const product = await Product.create({ name, description, image: uploadResult.secure_url, category, size, price });
    res.redirect(`/products/${product._id}`);
  } catch {
    res.status(500).send(renderPage('Error', `<p>Error al crear producto</p>`));
  }
};

const showProductById = async (req, res) => {
  try {
    const p = await Product.findById(req.params.productId);
    if (!p) {
      return res.status(404).send(renderPage('No encontrado', `<p>Producto no existe.</p>`, ''));
    }
    const content = `
      <h1>${p.name}</h1>
      <figure class="product-detail">
      <img src="${p.image}" alt="${p.name}" width="200">
      <p>${p.description}</p>
      <p><strong>Precio:</strong> ${p.price}€</p>
      <p><strong>Categoría:</strong> ${p.category} | <strong>Talla:</strong> ${p.size}</p>
      <a href="/products/${p._id}/edit">Editar</a> |
      <form action="/products/${p._id}?_method=DELETE" method="POST" style="display:inline">
        <button type="submit">Eliminar</button>
      </form>
    `;
    res.send(renderPage(p.name, content, ''));
  } catch (err) {
    const errorBody = `<p>Error al cargar detalle</p>`
    res.status(500).send(renderPage('Error', errorBody));
  }
};

const showEditProduct = async (req, res) => {
  try {
    const p = await Product.findById(req.params.productId);
    if (!p) {
      return res.status(404).send(renderPage('No encontrado', `<p>Producto no existe.</p>`, ''));
    }
    const formHtml = `
    <h1>Editar ${p.name}</h1>
      <form action="/products/${p._id}?_method=PUT" method="POST" enctype="multipart/form-data" class="product-form">` +
      `<div class="form-group"><label for="name">Nombre:</label><input id="name" name="name" value="${p.name}" required /></div>` +
      `<div class="form-group"><label for="description">Descripción:</label><textarea id="description" name="description" required>${p.description}</textarea></div>` +
      `<div class="form-group"><label for="image">Imagen:</label><input type="file" id="image" name="image" accept="image/*" /></div>` +
      `<div class="form-group"><label for="category">Categoría:</label><select id="category" name="category" required>` +
        `<option${p.category==='Camisetas'?' selected':''}>Camisetas</option>` +
        `<option${p.category==='Pantalones'?' selected':''}>Pantalones</option>` +
        `<option${p.category==='Zapatos'?' selected':''}>Zapatos</option>` +
        `<option${p.category==='Accesorios'?' selected':''}>Accesorios</option>` +
      `</select></div>` +
      `<div class="form-group"><label for="size">Talla:</label><select id="size" name="size" required>` +
        `<option${p.size==='XS'?' selected':''}>XS</option>` +
        `<option${p.size==='S'?' selected':''}>S</option>` +
        `<option${p.size==='M'?' selected':''}>M</option>` +
        `<option${p.size==='L'?' selected':''}>L</option>` +
        `<option${p.size==='XL'?' selected':''}>XL</option>` +
      `</select></div>` +
      `<div class="form-group"><label for="price">Precio:</label><input type="number" id="price" name="price" value="${p.price}" step="0.01" required /></div>` +
      `<button type="submit">Actualizar</button></form>`
    ;
    res.send(renderPage(`Editar - ${p.name}`, formHtml, ''));
  } catch (err) {
    const errorBody = `<p>Error al cargar edición.</p>`
    res.status(500).send(renderPage('Error', errorBody, ''));
  }
};


const updateProduct = async (req, res) => {
  try {
    const { name, description, image, category, size, price } = req.body;
    await Product.findByIdAndUpdate(req.params.productId, { name, description, image, category, size, price });
    res.redirect(`/products/${req.params.productId}`);
  } catch (err) {
    const errorBody = `<p>Error al actualizar producto.</p>`;
    res.status(500).send(renderPage('Error', errorBody, ''));
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.redirect('/products');
  } catch (err) {
    res.status(500).send(renderPage('Error', errorBody, ''));
  }
};

module.exports = {
  showProducts,
  showNewProduct,
  createProduct,
  showProductById,
  showEditProduct,
  updateProduct,
  deleteProduct
};