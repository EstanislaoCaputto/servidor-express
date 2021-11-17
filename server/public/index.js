document.addEventListener('submit', event=>{
    event.preventDefault();
    let form = document.querySelector('#prodForm');
    let dato = new FormData(form);
    let titulo = dato.get('titulo');
    let descripcion = dato.get('descripcion')
    let precio = dato.get('precio')
    let req = {
        titulo:titulo,
        descripcion:descripcion,
        precio:precio
    }
    fetch('http://localhost:8080/api/productos',{
        method:'POST',
        body:JSON.stringify(dato),
        headers:{
            "Content-type":"application/json"
        }
    }).then(result=>{
        return result.json()
    }).then(json=>{
        console.log(json);
    })
})