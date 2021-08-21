const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    
    usuario: {
        type: String,
        required: [true, 'usuario obligatorio'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email obligatorio'],
    },
    clave: {
        type: String,
        required: [true, 'clave obligatorio'],
    },
    admin: {
        type: Number,
        enum : [0,1],
        default: 0
    },
    vendedor: {
        type: Number,
        enum : [0,1],
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('usuarios', usuariosSchema);