const mongoose = require('mongoose');
const {Schema, model } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'],
        required: true,
    },
    size: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL'],
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
}, {timestmaps: true});

module.exports = model('Product', productSchema)