import { getUsersUtils } from "../services/serviceLocator/composer";
import { NewUserFields, ParciaUpdateUserFields, UpdateUserFields } from "../interfaces/utils/users/usersUtilsInterfaces";

function getUsers(){ 
    const usersUtils = getUsersUtils();
    return usersUtils.getUsers();
} 

function getUserById(id: string){
    const usersUtils = getUsersUtils();
    return usersUtils.getUserById(id);
}
function createUser(params: NewUserFields){
const usersUtils = getUsersUtils();
return usersUtils.createUser(params);
}

function updateUser(params: UpdateUserFields){
    const usersUtils = getUsersUtils ();
    return usersUtils.updateUser(params);
}

function parcialUpdateUser(params: ParciaUpdateUserFields){
    const usersUtils = getUsersUtils();
    return usersUtils.parcialUpdateUser(params);
}






export default{
    getUsers,
    getUserById,
    createUser,
    updateUser,
    parcialUpdateUser,
    
    
    

   
}