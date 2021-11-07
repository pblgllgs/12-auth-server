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
const whitelist = ['http://localhost:4000']; // list of allow domain

const corsOptions = {
   origin: function(origin, callback) {
      if (!origin) {
         return callback(null, true);
      }

      if (whitelist.indexOf(origin) === -1) {
         var msg = 'The CORS policy for this site does not ' +
            'allow access from the specified Origin.';
         return callback(new Error(msg), false);
      }
      return callback(null, true);
   }
};

app.use(cors(corsOptions));

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