import { Application } from "express";
import Routes from "../utils/constans/routes.json"
import UserNetwork from "../network/users"
import MessagesNetwork from "../network/message"

function routes(server: Application){
    server.use(Routes.user, UserNetwork),
    server.use(Routes.message, MessagesNetwork)

}
export default routes 