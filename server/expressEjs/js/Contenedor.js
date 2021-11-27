import fs from 'fs'
import crearId from './utilidades.js';

class Contenedor{
    constructor(archivo){
        this.archivo = archivo;
        
    }
    async save(producto) { //Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        try{
            let data = await fs.promises.readFile('./productos.txt','utf-8')
            let prod = JSON.parse(data)
            let id = crearId(5)
            producto.id = id;
            prod.push(producto)
            await fs.promises.writeFile('./productos.txt', JSON.stringify(prod, null, 2));
            console.log(`${producto.titulo} guardado exitosamente con el id: ${producto.id}`)
            return {status:"success", message:"producto guardado"}
        }catch{
            try {
                let id = crearId(5)
                producto.id = id
                await fs.promises.writeFile('./productos.txt', JSON.stringify([producto], null, 2));
                return{status:"success", message:"producto guardado"}
            } catch {
                return {status:"error", message:"No se pudo guardar"}
            }
        }
    }
    async editById(producto){
        try{
            let productos = await fs.promises.readFile('./productos.txt', 'utf-8');
            let prodParse = JSON.parse(productos);
            let filtarLista = prodParse.filter(p=>p.id!==producto.id);
            filtarLista.push(producto)
            
            try {
                await fs.promises.writeFile('./productos.txt',JSON.stringify(filtarLista,null,2))
            } catch{
                return {status:"error", message:"No se pudo editar el Producto"}
            }

        }
        catch{
            throw new Error('El item no existe o el id esta mal escrito!')
        }
    }
    async getById(id){//Obtien prod por id. Funcion asincrona
        try{
            let dato = await fs.promises.readFile('./productos.txt', 'utf-8');
            let obj = JSON.parse(dato);
            let objId = obj.find(p=>p.id===id)
            return(objId)
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
            console.log(`Error de lectura : ${error}`)
        }
    }
    async eliminarPorId(id){
        let dato = await fs.promises.readFile('./productos.txt', 'utf-8');
        let objetos = JSON.parse(dato);
        let objBorrado = objetos.filter(obj=>obj.id!==id)
        
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

export default Contenedor