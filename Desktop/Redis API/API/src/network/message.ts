import express, {Request, Response} from 'express';
import Controller from '../controller/messages';
import { error } from 'console';
import exp from 'constants';

const router = express.Router();

async function sendMessage(request: Request, response: Response){
    const result = await Controller.sendMessage(request.body);
    response.send(result);
}

export default
 router.post('/', sendMessage);