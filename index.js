require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const connectDB = require('./config/db')
const PORT = process.env.PORT || 3000;

connectDB();

const app = express()

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

const productRoutes = require('./routes/productRoutes');
app.use('/', productRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

