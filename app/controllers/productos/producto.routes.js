const express = require('express');
const app = express();
const { GetProductos, NewProducto, GetProducto, BorrarProducto, UpdateProducto } = require('./producto')
const { check } = require('express-validator');

async function getProductos(req, res) {
   // try {

        let respuesta = await GetProductos();
        res.send(respuesta);

    /*} catch (e) {
        res.send("Error en la busqueda de productos");
    }*/
}

async function newProducto(req, res) {
    try {
        let producto = req.body;
        console.log(producto);
        let respuesta = await NewProducto(producto);
        res.send(respuesta);
    } catch (e) {
       res.send("Error al ingresar el producto");
   }
}

async function getProducto(req, res) {
    try {
        let idProducto = req.params.idProducto;
        let respuesta = await GetProducto(idProducto);
        res.send(respuesta);

    } catch (e) {
        res.send("Error en la busqueda del producto");
    }
}

async function borrarProducto(req,res){
    try{
        let idProducto = req.params.idProducto;
        let respuesta = await BorrarProducto(idProducto);
        res.send(respuesta);
    }
    catch(e){
        res.send("Error eliminando producto.");
    }
}

async function updateProducto(req,res){
    //try{
        let idProducto = req.params.idProducto;
        let producto = req.body;

        let respuesta = await UpdateProducto(idProducto,producto);
        res.send(respuesta);
    /*}
    catch(e){
        res.send("Error actualizando producto.");
    }*/
}

//Get
app.get("/api/productos", getProductos);
app.get("/api/productos/:idProducto", getProducto);
//Post
app.post("/api/productos", newProducto)
//DELETE
app.delete("/api/productos/:idProducto",borrarProducto);

//UPDATE
app.put("/api/productos/:idProducto",updateProducto);


module.exports = app;