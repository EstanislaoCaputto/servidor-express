const socket = io();
socket.on('productosTiempoReal',dato=>{
    let productos = dato;
    fetch('templates/tablaProductos.handlebars').then(string=>string.text()).then(templates=>{
        const plantillaProcesada = Handlebars.compile(templates)
        const templObj={
            productos:productos
        }
        const html = plantillaProcesada(templObj);
        let div = document.getElementById('tablaProductos');
        div.innerHTML=html
    })
})

document.addEventListener('submit', event=>{
    event.preventDefault();
    let form = document.querySelector('#prodForm');
    let dato = new FormData(form);
    // let titulo = dato.get('titulo');
    // let descripcion = dato.get('descripcion')
    // let precio = dato.get('precio')
    // let req = {
    //     titulo:titulo,
    //     descripcion:descripcion,
    //     precio:precio
    // }
    fetch('http://localhost:8080/api/productos',{
        method:'POST',
        body:dato
        // headers:{
        //     "Content-type":"application/json"
        // }
    }).then(result=>{
        return result.json()
    }).then(json=>{
        console.log(json);
    })
})

document.getElementById("image").onchange = (e)=>{
    let read = new FileReader();
    read.onload = e =>{
        document.querySelector('.image-text').innerHTML = "Bien hecho!"
        document.getElementById("preview").src = e.target.result;
    }
    
    read.readAsDataURL(e.target.files[0])
}