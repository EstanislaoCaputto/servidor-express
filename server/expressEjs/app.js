import express from 'express'
const app = express();
const server = app.listen(8080,()=>{
    console.log('Servideor escuchando en el puerto 8080');
})

app.set('view engine', 'ejs')
app.get('/',(req,res)=>{
    res.render('hola.ejs',{nombre:"Estanislao"})
})