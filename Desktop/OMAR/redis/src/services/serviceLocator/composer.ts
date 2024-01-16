import {Connection} from "mysql2/promise"
import {DependencyLocator} from "./dependenciesLocator";
import dbService from "../database/database.service";
import { UsersUtils } from "../../utils/users/usersUtils";
import { UsersUtilsInterfaces } from "../../interfaces/utils/users/usersUtilsInterfaces";
import { MessageUtilsInterfaces } from "../../interfaces/utils/messages/messagesUtilsInterfaces";
import { MessageUtils } from "../../utils/messages/messagesUtils";
import Redis from "ioredis";

 export const di = DependencyLocator.getInstance();

const types = {
    database: "database",
    UsersUtils: "UsersUtils",
    MessageUtils: "MessageUtils",
    redis: "redis"
}

 export async function init(){
    const db = await dbService;
    const redis = new Redis({ host: '127.0.0.1', port: 6379 }); 
    di.bindLazySingleton("redis", () => redis);
    di.bindLazySingleton("database", () => db);
    di.bindFactory("UsersUtils", () => new UsersUtils(getDatabase(), getRedis())) 
    di.bindFactory("MessageUtils", () => new MessageUtils(getDatabase())) 

}

function getDatabase(): Connection{
    return di.get(types.database)
}

function getRedis(): Redis{
    return di.get(types.redis)
}

export function getUsersUtils(): UsersUtilsInterfaces{
    return di.get(types.UsersUtils)
}

export function sendMessageUtils(): MessageUtilsInterfaces{
    return di.get(types.MessageUtils)
}