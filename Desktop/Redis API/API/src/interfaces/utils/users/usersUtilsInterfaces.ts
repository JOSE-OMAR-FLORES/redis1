import { Connection } from "mysql2/promise";

export interface MySqlQuery{
    
        rows: Array<any>; //deben coincidir las entradas y salidas
        fields: Array<any>
    
}
export type NewUserFields = {
        names: string;
        lastNames: string;
        email: string;
        password: string;
        

}

export type UpdateUserFields = {
        names: string;
        lastNames: string;
        email: string;
        password: string;
        id: string;
        
}

export type ParciaUpdateUserFields = {
        names?: string;
        lastNames?: string;
        email?: string;
        password?: string;
        id: string;
        
}



    

export interface UsersUtilsInterfaces{
    
      
      
           getUsers(): Promise<any> ;

           getUserById(id: String):Promise<any>;

           createUser(params: NewUserFields);

           updateUser(params: UpdateUserFields);

        parcialUpdateUser(params: ParciaUpdateUserFields);

           

        



           
      }  
