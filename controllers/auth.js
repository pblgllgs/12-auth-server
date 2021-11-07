const {response} = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { db } = require('../models/Usuario');

const crearUsuario = async(req,res = response) => {

    const { email,name,password} = req.body;


    try {
        //verificar el email
        const usuario = await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({
                ok:false,
                msg: 'El email ya esta registrado'
            });
        }
        //Creando usuario con el modelo
        const dbUser = new Usuario(req.body);
        //encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);
        //generar el jwt
        const token = await generarJWT(dbUser.id,name);
        //Crear usuario de DB
        await dbUser.save();
        //generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            email,
            token
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }

};

const loginUsuario = async(req,res= response) => {

    const {email,password} = req.body;

    try {

        const dbUser = await Usuario.findOne({email});
        //verifica si el correo existe
        if(!dbUser){
            return res.status(400).json({
                ok: false,
                msg: 'Datos inválidos'
            });
        }

        //confirmar si el password hace mach
        const validPassword = bcrypt.compareSync( password,dbUser.password );

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Datos inválidos'
            });
        }

        //generar el jwt
        const token = await generarJWT(dbUser.id,dbUser.name);

        //respuesta
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token
        });
        
    } catch (error) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error en la autenticación'
        });
    }
};

const revalidarToken = async(req,res= response) => {

    const {uid} = req;

    //leer DB 

    const dbUser = await Usuario.findById(uid);

    //genero nuevo token por 24 h
    const token = await generarJWT(uid,dbUser.name);

    return res.json({
        ok: true,
        uid,
        name: dbUser.name,
        email: dbUser.email,
        token
    });

};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}