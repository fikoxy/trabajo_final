const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriasSchema = new Schema({
    idCategoria:{
        type: Number,
        required: [true,'idCategoria es obligatorio'],
        unique: true
    },
    nombre:{
        type: String,
        required: [true,'El nombre es obligatorio'],
    },
    estado:{
        type: String,
        enum:['ACTIVA','INACTIVA'],
        default:'ACTIVA'
    }
},{
    timestamps:true,
    versionKey: false
})

module.exports = mongoose.model('categorias',categoriasSchema,'categorias');