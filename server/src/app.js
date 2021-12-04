import express from 'express'
import cors from 'cors'
import {engine} from 'express-handlebars'
import upload from './services/upload.js'
import Contenedor from './js/Contenedor.js'
import __dirname from './utils.js';
import { Server } from 'socket.io'



const app = express();
const PORT = process.env.PORT || 8080;
const productos = new Contenedor('productos.txt');
const server = app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puesrto: ${PORT}`)
})
export const io = new Server(server)
import router from './route/productos.js';
const ProductRouter = router

//HANDLEBARS
app.engine('handlebars', engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))
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

//Desafio de la clase 9
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

// app.post('/api/subirarchivo', upload.array('images'),(req,res)=>{
//     const files = req.files;
//     if (!files ||files.length===0) {
//         res.status(500).send({message:"No se subio el archivo"})
//     }
//     res.send(files)
// })
let message = [];
io.on('connection', async socket=>{
    console.log(`El socket ${socket.id} se ha conectado`);
    let producto = await productos.getAll();
    socket.emit('productosTiempoReal', producto)
    socket.on('message',data=>{
        message.push(data)
        io.emit('messagelog', message);
    })
})
