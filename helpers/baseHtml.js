function baseHtml(title, content) {
    return `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
            body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}
nav ul {
  list-style: none;
  display: flex;
  background-color: #333;
  margin: 0;
  padding: 0;
}
nav ul li {
  margin: 0;
}
nav ul li a {
  color: #fff;
  padding: 10px 15px;
  display: block;
  text-decoration: none;
}
nav ul li a.active,
nav ul li a:hover {
  background-color: #555;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}
.product-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 10px;
  text-align: center;
}
.product-card img {
  max-width: 100%;
  height: auto;
}
.product-form,
.auth-form {
  background-color: #fff;
  padding: 20px;
  max-width: 500px;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  background-color: #28a745;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #218838;
}
        </style>
    </head>
    <body>
        ${content}
    </body>
    </html>`;
}

module.exports = baseHtml;