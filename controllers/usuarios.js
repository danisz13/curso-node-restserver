const bcryptjs=require('bcryptjs');
const { findByIdAndUpdate } = require('../models/usuario');
const Usuario=require('../models/usuario');


const usuariosGet=(async(req=request, res) => {
    

    const { limite = 5, desde=0} =req.query;

    const query={estado:true};

    

    const [total, usuarios]= await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))

    ]);

    res.json({
        total,
        usuarios
    });


});
const usuariosPut=(async(req, res) => {
    
    const {id} = req.params;
    const { _id, password, google,correo, ...resto}=req.body;

    //TODO: Validar contra bd

    if(password){
        const salt=bcryptjs.genSaltSync();
        resto.password=bcryptjs.hashSync(password, salt);
    }
    const usuario=await Usuario.findByIdAndUpdate(id, resto);
    
    res.json({
        msg: 'put API desde asd',
        usuario
    });
});
const usuariosPost= async(req, res) => {
    
    


    const {nombre, correo, password, rol}=req.body;
    const usuario=new Usuario({nombre, correo, password, rol});
    
    //Encriptar la password
    const salt=bcryptjs.genSaltSync();
    usuario.password=bcryptjs.hashSync(password, salt);

    //Guardar en db
    await usuario.save();



    res.json({
        msg: 'post API desde controlador',
        usuario
    });
    
    
};
const usuariosPatch=((req, res) => {
    
    res.json({
        msg: 'patch API desde controlador'
    });
});

const usuariosDelete=(async (req, res) => {

   const {id}=req.params;

   //Borrar fisicamente
   //const usuario=await Usuario.findByIdAndDelete(id);

   const usuario=await findByIdAndUpdate(id, {estado:false});

    res.json({
        msg: 'delete API desde controlador',
        id,
        usuario
    });
});

module.exports={
    usuariosGet,
    usuariosDelete,
    usuariosPatch,
    usuariosPost,
    usuariosPut
}