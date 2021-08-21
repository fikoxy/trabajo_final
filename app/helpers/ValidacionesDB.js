  
const categorias = require('../models/categorias')

const existeNombreCategoria = async (nombre)=>{
    let categoria = await categorias.findOne({nombre});
    if(categoria){
        throw new Error(`El nombre ${nombre} ya esta ingresado.`);
    }
}

module.exports = {
    existeNombreCategoria
}