import express from 'express'
import Contenedor from './js/Contenedor.js'
const productos = new Contenedor();
const app = express();
const server = app.listen(8080,()=>{
    console.log('Servideor escuchando en el puerto 8080');
})

app.use(express.static('./public'))
app.set('view engine', 'ejs')
app.set('views', './views')
app.get('/productos',(req,res)=>{
    productos.getAll().then(result=>{
        let productos = result
        let objsRender = {
            todosLosProductos:productos
        }
        res.render('hola.ejs', objsRender)
    })
})

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('./public'))