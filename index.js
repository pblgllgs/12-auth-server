const express = require('express');
const cors = require('cors');
const path = require('path');

const { dbConnection } = require('./db/config');
//importando para poder configurar como variable de entorno el puerto
require('dotenv').config();

//crear el sevidor/app de express
const app = express();

//base de datos
dbConnection();

//Directorio publico
app.use(express.static('public'));

//cors
/* 
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
 */

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
};

app.use(cors('allowCrossDomain'));

//lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));

//manejar las demas rutas
app.get('*', (req,res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html'));
});

/* puerto que va a escuchar, depende del host,
pero este es un mensaje cuando se despliega */
app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});