const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productosSchema = new Schema({

    idProducto: {
        type: Number,
        required: [true, 'el id es obligatorio'],
        unique: true
    },
    nombre: {
        type: String
    },
    precio: {
        type: Number        
    },
    idCategoria: {
        type: Number,
        default: 1
    },
    estado: {
        type: String,
        emun: ['V', 'I'],
        default: 'V'
    },
    imagen: {
        type: String
    },
    descripcion: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('productos', productosSchema, 'productos');