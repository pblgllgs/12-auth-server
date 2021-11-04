const express = require('express');
const cors = require('cors');
//importando para poder configurar como variable de entorno el puerto
require('dotenv').config();

//crear el sevidor/app de express
const app = express();

//Directorio publico
app.use(express.static('public'));

//cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));


/* puerto que va a escuchar, depende del host,
pero este es un mensaje cuando se despliega */
app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});