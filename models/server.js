const express = require('express');
const cors=require('cors');
const { dbConnection } = require('../db/config');

class Server {
    constructor() {
        this.app = express();
        this.port=process.env.PORT;

        this.usuariosPath='/api/usuarios';
        
        //Conectar a BD
        this.conectarDB();


        //Middlewares
        this.middlewares();
        //Rutas de mi app
        this.routes();
        //Listen
        this.listen();
    }


    async conectarDB(){
        await dbConnection();
    }


    middlewares(){
        
        //CORS
        this.app.use(cors());
        
        //Lectura y parseo del body
        this.app.use(express.json());


        // Directorio publico
        this.app.use(express.static('public'));

    }



    routes() {
        
        this.app.use('/api/usuarios', require('../router/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en ', this.port);
        });
    }
}

module.exports = Server;