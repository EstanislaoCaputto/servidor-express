import express from 'express';
const router = express.Router();
import upload from '../services/upload.js';
import Contenedor from '../js/Contenedor.js';
const contenedor = new Contenedor();

//GET
router.get('/',(req,res)=>{ // Obtiene todos los productos
    contenedor.getAll().then(result=>{
        res.send(result);
    })
})

router.get('/:pid', (req,res)=>{ // Obtiene producto por ID
    let id = req.params.pid
    contenedor.getById(id).then(result=>{
        res.send(result);
    })
})

//POST
router.post('/', upload.single('image'), (req,res)=>{ //Agrega un nuevo producto
    let file = req.file
    let producto = req.body;
    producto.precio = parseInt(producto.precio)
    producto.thumbnail = req.protocol+"://" + req.hostname+":8080/"+req.file.filename;
    contenedor.save(producto).then(result=>{
        res.send(result)
    })
})

//PUT
router.put('/', async (req,res)=>{ //Recibe producto y lo edita segun ID
    try {
        let product = await contenedor.editById(req.body)
        res.send({message:"Editado con exito"})
    } catch{
        return({message:"Error al editar"})
    }
})


//DELETE
router.delete('/:pid',(req,res)=>{
    let id = req.params.pid;
    contenedor.eliminarPorId(id).then(result=>{
        res.send(result)
    })
})
export default router