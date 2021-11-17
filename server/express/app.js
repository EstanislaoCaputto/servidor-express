const express = require('express');
const cors = require('cors')
const multer = require('multer')
const Contenedor = require('./js/Contenedor')
const app = express();
const PORT = process.env.PORT || 8080;
const productos = new Contenedor('productos.txt');

const server = app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puesrto: ${PORT}`)
})
const ProductRouter = require('./route/productos'); 
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public')
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+file.originalname)
    }
})
const upload = multer({storage:storage});

app.use(cors());
app.use(upload.single('file'))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/api/productos', ProductRouter);
app.use(express.static('public'))
app.use((req,res,next)=>{
    let timestamp= Date.now();
    let time = new Date(timestamp);
    console.log('Peticion hecha a las: '+time.toTimeString().split(" ")[0]);
    next();
})

