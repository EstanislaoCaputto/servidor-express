const express = require('express');
const Contenedor = require('../js/Contenedor')
const app = express();
const PORT = process.env.PORT || 8080;
const productos = new Contenedor('productos.txt');

const server = app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puesrto: ${PORT}`)
})

app.get('/productos', async (req, res)=>{
    let todosLosProductos = await productos.getAll()
    res.send({todosLosProductos})
})

app.get('/productoRandom', async (req, res)=>{
    let losProductos = await productos.getAll();
    let indiceRandom = Math.round(Math.random()*2);
    res.send(losProductos[indiceRandom])
})
