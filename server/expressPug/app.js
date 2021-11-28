import express from 'express'
import cors from 'cors'
import Contenedor from './js/Contenedor.js';
import upload from './services/upload.js'
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puesrto: ${PORT}`)
})
const productos = new Contenedor();

//PUG
app.set('views', './views' );
app.set('view engine', 'pug');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.static('./public'))

app.get('/productos', (req,res)=>{
    productos.getAll().then(result=>{
        let renderObj = {
            objetos:result
        }
        res.render('productos', renderObj)
    })
})

app.post('/productos', upload.array('image'),(req,res)=>{
    const files = req.files;
    if (!files ||files.length===0) {
        res.status(500).send({message:"No se subio el archivo"})
    }else{
        res.status(200).send({message:'Producto subido con exito'})
    }
    res.send(files)
})