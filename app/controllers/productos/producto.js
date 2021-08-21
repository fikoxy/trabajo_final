const Producto = require('../../models/productos');

async function GetProductos() {
    let data = await Producto.find({});
    return data;
}

async function GetProducto(idProducto) {
    let data = await Producto.findOne({ idProducto: idProducto });
    return data;
}

async function NewProducto(producto) {
    const { idProducto, nombre, precio, idCategoria, estado, imagen, descripcion, creacion, modificacion } = producto;
    
    let nuevoProducto = new Producto({
        idProducto,
        nombre,
        precio,
        idCategoria,
        estado,
        imagen,
        descripcion,
        creacion,
        modificacion
    })
    let data = await nuevoProducto.save();

    return data;
}

async function BorrarProducto(idProducto){
    let data = await Producto.deleteOne({idProducto:idProducto});
    return data;
}

async function UpdateProducto(idProducto,producto){
    let data = await Producto.findOneAndUpdate({idProducto:idProducto},producto,{
        returnOriginal: false
      });
    return data;
}

module.exports = {
    GetProductos,
    NewProducto,
    GetProducto,
    BorrarProducto,
    UpdateProducto
}