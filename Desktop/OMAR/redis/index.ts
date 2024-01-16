import express from 'express';
import cors from "./src/middelwares/corsMiddleware"
import routes from "./src/routes"
import { init } from './src/services/serviceLocator/composer'
import Redis from 'ioredis';

const server = express();
const ResponseTime = require('response-time')
server.use(express.json())
server.use(ResponseTime())

init();

// Crear una nueva instancia de Redis
const redis = new Redis();







server.use(cors)
routes(server)

server.listen(9000 , function (){
    console.log('Servidor iniciando en el puerto 9000');
});