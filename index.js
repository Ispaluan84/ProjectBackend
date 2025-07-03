require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const multer = require('multer');
const connectDB = require('./config/db')
const cloudinary = require('./config/cloudinary');


const storage = multer.memoryStorage();
const upload = multer({ storage});

connectDB();

const app = express()


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));




const productRoutes = require('./routes/productRoutes');
app.use('/', productRoutes(upload, cloudinary));

const apiRoutes = require('./routes/api/productApiRoutes')
app.use('/api', apiRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

