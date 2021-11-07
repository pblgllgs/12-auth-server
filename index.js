const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./db/config');
require('dotenv').config();

// Crear el servidor/aplicación de express
const app = express();

// Base de datos
dbConnection();

// Directorio Público
app.use( express.static('public') );

// CORS

var corsConfig = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
};

app.use( cors('corsConfig') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use( '/api/auth', require('./routes/auth') );

//manejar las demas rutas
app.get('*', (req,res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html'));
});

/* puerto que va a escuchar, depende del host,
pero este es un mensaje cuando se despliega */
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});