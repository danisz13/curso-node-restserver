const {response} =require('express');

const usuariosGet=((req=request, res) => {

    const {q='', nombre='', apikey=''}=req.query;

    res.json({
        msg: 'get API desde controlador',
        q,
        apikey,
        nombre
    });
});
const usuariosPut=((req, res) => {

    const {id} = req.params;

    res.json({
        msg: 'put API desde controlador',
        id
    });
});
const usuariosPost=((req, res) => {

    const {nombre, edad}=req.body;

    res.json({
        msg: 'post API desde controlador',
        nombre, 
        edad
    });
    
    
});
const usuariosPatch=((req, res) => {
    res.json({
        msg: 'patch API desde controlador'
    });
});
const usuariosDelete=((req, res) => {
    res.json({
        msg: 'delete API desde controlador'
    });
});

module.exports={
    usuariosGet,
    usuariosDelete,
    usuariosPatch,
    usuariosPost,
    usuariosPut
}