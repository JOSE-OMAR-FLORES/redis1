import express, {Request, Response} from 'express';
import Controller from '../controller/users';
import { error } from 'console';


const router = express.Router();

async function getUsers(request: Request, response: Response){
    const result = await Controller.getUsers();
    response.send(result);
}


function getUserById(request:Request, response:Response){
    const id = request.params.id;
Controller.getUserById(id)
.then(
    // cuando se resuelve la promesa
    (result)=>{
response.status(200).send(result);
    }
)
.catch(
    // se ejecuta cuando falla la promesa
    (error)=>{
        response.status(500).send(error.message)

    }
)
}

function createUser(request:Request, response:Response){
    const{
        names,
        lastNames,
        email,
        password,
    } = request.body;
    console.log(names, lastNames, email, password, "soy network")

    Controller.createUser({
        names,
        lastNames,
        email,
        password,
    })
    .then(
        (result) =>{
            response.status(200).send(result)
        }
    )
    .catch(
        (error) => response.status(500).send(error)
    )
}

function updateUser(request:Request, response:Response){
    const id = request.params.id;
    const{
        names,
        lastNames,
        email,
        password,
    } = request.body;
    Controller.updateUser({
        names,
        lastNames,
        email,
        password,
        id,
    })
    .then(
        (result) => {
            response.status(200).send(result)
        }
    )
    .catch(
        (error) => response.status(500).send(error)
    )
}


function parcialUpdate(request:Request, response:Response){
    const id = request.params.id;
    const{
        names,
        lastNames,
        email,
        password,
    } = request.body;
    Controller.parcialUpdateUser({
        names,
        lastNames,
        email,
        password,
        id,
    })
    .then(
        (result) => {
            response.status(200).send(result)
        }
    )
    .catch(
        (error) => response.status(500).send(error)
    )
}


















router.get('/', getUsers);
router.get('/id/:id', getUserById)
router.post('/', createUser)
router.put('/id/:id', updateUser)
router.patch('/id/:id', parcialUpdate)




export default router;


