const Categoria = require('../../models/categorias');

async function GetCategorias(){
    let data = await Categoria.find({});
    return data;
}

async function GetCategoria(id){
    let data = await Categoria.findOne({idCategoria:id});
    return data;
}

async function DeleteCategoria(id){
    let data = await Categoria.deleteOne({idCategoria:id});
    return data;
}

async function UpdateCategoria(id,categoria){
    let data = await Categoria.findOneAndUpdate({idCategoria:id},categoria,{
        returnOriginal: false
      });
    return data;
}


async function NewCategoria(categoria){
    const {idCategoria,nombre,estado} = categoria;
    let nuevoCategoria = new Categoria({
        idCategoria,
        nombre,
        estado
    })
    let data = await nuevoCategoria.save();	
    return data;
}

module.exports = {
    GetCategorias,
    GetCategoria,
    NewCategoria,
    DeleteCategoria,
    UpdateCategoria
}