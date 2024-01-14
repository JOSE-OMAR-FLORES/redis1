import {Connection} from "mysql2/promise"
import {DependencyLocator} from "./dependenciesLocator";
import dbService from "../database/database.service";
import { UsersUtils } from "../../utils/users/usersUtils";
import { UsersUtilsInterfaces } from "../../interfaces/utils/users/usersUtilsInterfaces";
import { MessageUtilsInterfaces } from "../../interfaces/utils/messages/messagesUtilsInterfaces";
import { MessageUtils } from "../../utils/messages/messagesUtils";

 export const di = DependencyLocator.getInstance();

const types = {
    database: "database",
    UsersUtils: "UsersUtils",
    MessageUtils: "MessageUtils"
}

 export async function init(){
    const db = await dbService;
    di.bindLazySingleton("database", () => db);
    di.bindFactory("UsersUtils", () => new UsersUtils(getDatabase()))
    di.bindFactory("MessageUtils", () => new MessageUtils(getDatabase()))

}

function getDatabase(): Connection{
    return di.get(types.database)
}

export function getUsersUtils(): UsersUtilsInterfaces{
    return di.get(types.UsersUtils)
}

export function sendMessageUtils(): MessageUtilsInterfaces{
    return di.get(types.MessageUtils)
}