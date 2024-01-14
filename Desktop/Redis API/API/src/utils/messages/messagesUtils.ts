import { Connection } from 'mysql2/promise';
import { sendMessageFields } from '../../interfaces/utils/messages/messagesUtilsInterfaces';

export class MessageUtils{
    private databaseConexion: Connection;
    constructor(db: Connection){
    this.databaseConexion = db ;

}

async sendMessage(params: sendMessageFields){
    const{
        id,
        message,
        type,
    } = params;
    const prepareQuery = "INSERT INTO messages (id, message, type) VALUES (?,?,?)";
    const rows =  await this.databaseConexion.query(prepareQuery, [id, message, type])
    return rows;
}
}