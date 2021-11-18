const express = require('express');
const cors = require('cors')
const upload = require('./services/upload')
const Contenedor = require('./js/Contenedor')
const app = express();
const PORT = process.env.PORT || 8080;
const productos = new Contenedor('productos.txt');
const server = app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puesrto: ${PORT}`)
})
const ProductRouter = require('./route/productos'); 



app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use('/imagenes', express.static(__dirname+'/public'))
app.use((req,res,next)=>{
    let timestamp= Date.now();
    let time = new Date(timestamp);
    console.log('Peticion hecha a las: '+time.toTimeString().split(" ")[0]);
    next();
})
app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).send('Error en el servidor')
})
app.use('/api/productos', ProductRouter);


app.post('/api/subirarchivo', upload.array('images'),(req,res)=>{
    const files = req.files;
    console.log(files);
    if (!files ||files.length===0) {
        res.status(500).send({message:"No se subio el archivo"})
    }
    res.send(files)
})
