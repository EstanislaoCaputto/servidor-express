import express from 'express'
import cors from 'cors'
import {engine} from 'express-handlebars'
import upload from './services/upload.js'
import Contenedor from './js/Contenedor.js'
const app = express();
const PORT = process.env.PORT || 8080;
const productos = new Contenedor('productos.txt');
const server = app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puesrto: ${PORT}`)
})
import router from './route/productos.js';
const ProductRouter = router

//HANDLEBARS
app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.static('./public'))
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

// app.get('/',(req,res)=>{
//     let timestamp= Date.now();
//     let time = new Date(timestamp);
//     res.render('plantilla1',{
//         title:"Hola 420s!!", 
//         message:"Rica hora",
//         tiempo:time
//     })
// })
app.get('/views/productos',(req, res)=>{
    productos.getAll().then(result=>{
        let info = result;
        let prepararObjeto = {
            list: info
        }
        res.render('home', prepararObjeto)
    })
})

app.post('/api/subirarchivo', upload.array('images'),(req,res)=>{
    const files = req.files;
    console.log(files);
    if (!files ||files.length===0) {
        res.status(500).send({message:"No se subio el archivo"})
    }
    res.send(files)
})
