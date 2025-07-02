const Product = require('../models/Product');

const showProducts = async (req, res) => {
    try {
        const products = await Product.find();
        let html = '<h1>Todos los productos</h1><ul>';
        products.forEach(p => {
            html += `<li>${p.name} - <a href="/products/${p._id}">Ver detalle</a></li>`;
        });
        html += '</ul><a href="/products/new">Crear producto</a>';
            res.send(html);
    } catch (err) {
        res.status(500).send('Error al obtener productos')
    }
};

const showNewProduct = (req, res) => {
  const html = `
    <h1>Nuevo Producto</h1>
    <form action="/products" method="POST">
      <label>Nombre: <input name="name" required></label><br>
      <label>Descripción: <textarea name="description" required></textarea></label><br>
      <label>Imagen (URL): <input name="image" required></label><br>
      <label>Categoría:
        <select name="category" required>
          <option value="Camisetas">Camisetas</option>
          <option value="Pantalones">Pantalones</option>
          <option value="Zapatos">Zapatos</option>
          <option value="Accesorios">Accesorios</option>
        </select>
      </label><br>
      <label>Talla:
        <select name="size" required>
          <option value="XS">XS</option><option value="S">S</option>
          <option value="M">M</option><option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </label><br>
      <label>Precio: <input type="number" name="price" step="0.01" required></label><br>
      <button type="submit">Crear</button>
    </form>
    <a href="/products">Volver</a>
  `;
  res.send(html);
};

const createProduct = async (req, res) => {
  try {
    const { name, description, image, category, size, price } = req.body;
    const product = await Product.create({ name, description, image, category, size, price });
    res.redirect(`/products/${product._id}`);
  } catch (err) {
    res.status(500).send('Error al crear producto');
  }
};

const showProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).send('Producto no encontrado');
    let html = `
      <h1>${product.name}</h1>
      <img src="${product.image}" alt="${product.name}" width="200"><br>
      <p>${product.description}</p>
      <p>Precio: ${product.price}€</p>
      <p>Categoría: ${product.category} | Talla: ${product.size}</p>
      <a href="/products/${product._id}/edit">Editar</a> |
      <form action="/products/${product._id}?_method=DELETE" method="POST" style="display:inline">
        <button type="submit">Eliminar</button>
      </form>
      <br><a href="/products">Volver</a>
    `;
    res.send(html);
  } catch (err) {
    res.status(500).send('Error al obtener detalle del producto');
  }
};

const showEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).send('Producto no encontrado');
    const html = `
      <h1>Editar ${product.name}</h1>
      <form action="/products/${product._id}?_method=PUT" method="POST">
        <label>Nombre: <input name="name" value="${product.name}" required></label><br>
        <label>Descripción: <textarea name="description" required>${product.description}</textarea></label><br>
        <label>Imagen (URL): <input name="image" value="${product.image}" required></label><br>
        <label>Categoría:
          <select name="category" required>
            <option value="Camisetas"${product.category==='Camisetas'? ' selected':''}>Camisetas</option>
            <option value="Pantalones"${product.category==='Pantalones'? ' selected':''}>Pantalones</option>
            <option value="Zapatos"${product.category==='Zapatos'? ' selected':''}>Zapatos</option>
            <option value="Accesorios"${product.category==='Accesorios'? ' selected':''}>Accesorios</option>
          </select>
        </label><br>
        <label>Talla:
          <select name="size" required>
            <option value="XS"${product.size==='XS'? ' selected':''}>XS</option>
            <option value="S"${product.size==='S'? ' selected':''}>S</option>
            <option value="M"${product.size==='M'? ' selected':''}>M</option>
            <option value="L"${product.size==='L'? ' selected':''}>L</option>
            <option value="XL"${product.size==='XL'? ' selected':''}>XL</option>
          </select>
        </label><br>
        <label>Precio: <input type="number" name="price" value="${product.price}" step="0.01" required></label><br>
        <button type="submit">Actualizar</button>
      </form>
      <a href="/products">Volver</a>
    `;
    res.send(html);
  } catch (err) {
    res.status(500).send('Error al cargar formulario de edición');
  }
};


const updateProduct = async (req, res) => {
  try {
    const { name, description, image, category, size, price } = req.body;
    await Product.findByIdAndUpdate(req.params.productId, { name, description, image, category, size, price });
    res.redirect(`/products/${req.params.productId}`);
  } catch (err) {
    res.status(500).send('Error al actualizar producto');
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.redirect('/products');
  } catch (err) {
    res.status(500).send('Error al eliminar producto');
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