
import {sendMessageUtils} from "../services/serviceLocator/composer";
import { sendMessageFields } from "../interfaces/utils/messages/messagesUtilsInterfaces";

function sendMessage(params: sendMessageFields){
    const messageUtils = sendMessageUtils();
    return messageUtils.sendMessage(params);
}

export default{
    sendMessage,
}