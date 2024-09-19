import express from "express"   //const express = require('express');
import cors from 'cors'
//import db from "./database/db.js"
import apiRoutes from './routes/routes.js'  //const apiRoutes = require('./routes/api');

const app = express() //const app = express();
app.use(cors())
app.use(express.json())  //app.use(express.json());
app.use('/api',apiRoutes)  //app.use('/api', apiRoutes);

/*try {
    await db.authenticate()
    console.log("conexion exitosa")
} catch (error) {
    console.log("Error conexion")
}
app.get('/',(req,res)=>{
    res.send('Hoal Mundo')
})
app.listen(8000,()=>{
    console.log('server runnirn')
})  */










const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
