import express from 'express'; //import express
import cors from "./src/middelwares/corsMiddleware"
import routes from "./src/routes"
import { init } from './src/services/serviceLocator/composer'


const server = express();
server.use(express.json())

init();


server.use(cors)
routes(server)



server.listen(9000 , function (){

    console.log('Servidor iniciando en el puerto 9000');
}
)