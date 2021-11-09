const fs = require('fs');
const crearId = require('./utilidades');

class Contenedor{
    constructor(archivo){
        this.archivo = archivo;
        
    }
    save(producto) { //Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        for (let i in producto) {
            let id = crearId(5);
            producto.map(obj=>{
                if(obj.id===id){
                    id += crearId(1)
                    
                }else{
                    producto[i].id = id;

                }
            })
            console.log(`Producto guardado, id asignado: ${id}`)
        }
        fs.promises.writeFile('./productos.txt', JSON.stringify(producto, null, 2)
        ).then(()=>{
            return {status:"success", message:"Productos guardados con Exito!"};
            
        }).catch((error) => {
            throw new Error(`Error en escritura: ${error}`);

        })
    }
    async getById(id){
        try{
            let dato = await fs.promises.readFile('./productos.txt', 'utf-8');
            let obj = JSON.parse(dato);
            let objId = obj.find(p=>p.id===id)
            return(console.log(objId))
        }
        catch{
            throw new Error('El item no existe o el id esta mal escrito!')
        }
    }
    async getAll() { //Devuelve un array con los objetos presentes en el archivo
        try {
            let datos = await fs.promises.readFile('./productos.txt', 'utf-8')
            let objetos = JSON.parse(datos)
            return(objetos)

        }catch (error){
            console.log(`Error de escritura : ${error}`)
        }
    }
    async eliminarPorId(id){
        let dato = await fs.promises.readFile('./productos.txt', 'utf-8');
        let objetos = JSON.parse(dato);
        let objBorrado = objetos.filter(obj=>obj.id===id)
        
        try {
            await fs.promises.writeFile('./productos.txt', JSON.stringify(objBorrado, null, 2));
            return(console.log('Producto eliminado satisfactoriamente'))
            
        }catch(err){
            console.log(`El ID ingresado no corresponde a ninguno de nuestros productos, ${err}`);
        }
    }
    async eliminarTodo() {//Elimina todo el archivo
        await fs.promises.unlink('./productos.txt', function (err) {
            if (err) throw err;
            console.log('Archivo eliminado!');
        });
    }
}

//const misProductos = new Contenedor('productos.txt');
//misProductos.save([{titulo:'Arlequin', precio:350, imagen:'./img/arlequin.jpg'},{titulo:'Las Hojas', precio:220, imagen:'./img/Las-Hojas.jpg'},{titulo:'Van Haasen', precio:22, imagen:'./img/van-häasen.jpg'}]);
//misProductos.eliminarPorId('') para usar escriba el id que aparece en consola del producto q quieras eliminar
//misProductos.getAll()
//misProductos.eliminarTodo()
//misProductos.getById("qxgzHT67FX")

module.exports = Contenedor