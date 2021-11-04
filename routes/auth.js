const{ Router } =  require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

const router = Router();

//Crear un nuevo usuario
router.post('/new',[
    check('name','el nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').isLength(6)
] ,crearUsuario);

//Login de usuario
router.post('/', [
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').isLength(6)
],loginUsuario);

//Validar token
router.get('/renew',revalidarToken );

module.exports = router;