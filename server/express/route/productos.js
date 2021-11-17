const express = require('express');
const router = express.Router();
const Contenedor = require('../js/Contenedor');
const contenedor = new Contenedor();

//GET
router.get('/',(req,res)=>{
    contenedor.getAll().then(result=>{
        res.send(result);
    })
})

router.get('/:pid', (req,res)=>{
    let id = req.params.pid
    contenedor.getById(id).then(result=>{
        res.send(result);
    })
})

//POST
router.post('/', (req,res)=>{
    let producto = req.body;
    producto.precio = parseInt(producto.precio)
    contenedor.save(producto).then(result=>{
        res.send(result)
    })
})

//PUT
// router.put('/:pid',(req,res)=>{
//     let id = req.params.pid;
//     contenedor.
// })
//DELETE
router.delete('/:pid',(req,res)=>{
    let id = req.params.pid;
    contenedor.eliminarPorId(id).then(result=>{
        res.send(result)
    })
})
module.exports = router;