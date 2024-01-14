import { Connection } from 'mysql2/promise';
import { NewUserFields, ParciaUpdateUserFields, UpdateUserFields} from '../../interfaces/utils/users/usersUtilsInterfaces';
import * as CryptoJS from 'crypto-js';
import users from '../../controller/users';


export class UsersUtils{ 
       private databaseConexion: Connection;
        constructor(db: Connection){
        this.databaseConexion = db ;

}
   
async getUsers(): Promise<any> {
            const query = "SELECT * FROM users"
            const [rows] = await this.databaseConexion.query(query)
            return rows;
            

            
        }

async getUserById(id: String): Promise<any>{
            const query = "SELECT * FROM users WHERE id =" + id;
            const [rows] = await this.databaseConexion.query(query, [id]);
            return [rows]
}

async getUserByEmail(email: string): Promise<any>{
    const prepareQuery = "SELECT * FROM users WHERE email = ?";
    const [rows] = await this.databaseConexion.query(prepareQuery, [email])
    return rows;
} 

 async createUser(params: NewUserFields){
            const{
                names,
                lastNames,
                email,
                password,
            } = params;
            const users =  await this.getUserByEmail(email);
            if(users.length > 0 ){
                return Promise.reject('el usuario ya existe');
            }

            const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.WHATSAPP_SECRET_KEY).toString();
            const prepareQuery = "INSERT INTO users (names, lastNames, email, password) VALUES (?,?,?,?)";
            console.log(names, lastNames, email, encryptedPassword)
            const rows =  await this.databaseConexion.query(prepareQuery, [names, lastNames, email, encryptedPassword])
            return rows;
            
}


async updateUser(params: UpdateUserFields){
    const{
        names,
        lastNames,
        email,
        password,
        id,
    } = params;
    const users = await this.getUserById(id);
    if (users.length === 0) {
        return Promise.reject('el usuario no existe');
    }
    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.WHATSAPP_SECRET_KEY).toString();
    const  prepareQuery = "UPDATE users SET names = ?, lastNames = ?, email = ?, password = ? WHERE id = ?";
    const [rows] = await this.databaseConexion.query(prepareQuery, [names, lastNames, email, encryptedPassword,id])
    return rows;
}

async parcialUpdateUser(params: ParciaUpdateUserFields){
    const{
        names,
        lastNames,
        email,
        password,
        id,
    } = params;
    const users = await this.getUserById(id);
    if (users.length === 0) {
        return Promise.reject('el usuario no existe');
    }

    let updateFields = [];
    let values = [];

    if (names) {
        updateFields.push('names = ?');
        values.push(names);
    }

    if (lastNames) {
        updateFields.push('lastNames = ?');
        values.push(lastNames);
    }

    if (email) {
        updateFields.push('email = ?');
        values.push(email);
    }

    if (password) {
        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.WHATSAPP_SECRET_KEY).toString();
        updateFields.push('password = ?');
        values.push(encryptedPassword);
    }

    const prepareQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
    values.push(id);

    const [rows] = await this.databaseConexion.query(prepareQuery, values);
    return rows;
}



}
