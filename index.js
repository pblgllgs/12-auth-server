const express = require('express');
const cors = require('cors');

//crear el sevidor/app de express

const app = express();

//cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));


/* puerto que va a escuchar, depende del host,
pero este es un mensaje cuando se despliega */
app.listen(4000, () =>{
    console.log(`Servidor corriendo en puerto ${ 4000 }`);
});