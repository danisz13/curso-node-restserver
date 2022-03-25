
const { Router }=require('express');
const {check} =require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRolValido, esEmailValido, emailExiste, usuarioExistePorID } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router=Router();


router.get('/', usuariosGet);
router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(usuarioExistePorID),
    check('rol').custom(esRolValido),
    validarCampos
] ,usuariosPut);
router.post('/', [
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('password', 'El password debe tener mas de 6 letras').isLength({min: 6}),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPost);
router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(usuarioExistePorID),
    validarCampos
], usuariosDelete);
router.patch('/', usuariosPatch);




module.exports=router;