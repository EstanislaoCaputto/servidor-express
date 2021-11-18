document.addEventListener('submit', event=>{
    event.preventDefault();
    let form = document.querySelector('#editForm');
    let dato = new FormData(form);
    let titulo = dato.get('titul');
    let descripcion = dato.get('descripcin')
    let precio = dato.get('preci')
    let id = dato.get('id')
    let req = {
        titulo:titulo,
        descripcion:descripcion,
        id:id,
        precio:precio
    }
    fetch('http://localhost:8080/api/productos',{
        method:'PUT',
        body:JSON.stringify(req),
        headers:{
            "Content-type":"application/json"
        }
    }).then(result=>{
        return result.json()
    }).then(json=>{
        console.log(json);
    })
})