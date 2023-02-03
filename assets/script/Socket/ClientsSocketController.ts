import { _decorator, Component, Node, director } from 'cc';
import io from 'socket.io-client/dist/socket.io.js'
import { ChatController } from '../Controller/ChatController';
import { ChatGlobalController } from '../Controller/ChatGlobalController';
import { ChatLocalController } from '../Controller/ChatLocalController';
import { ChatPrivateController } from '../Controller/ChatPrivateController';
import { ChatPrivateUserToUser } from '../Controller/ChatPrivateUserToUser';
import { GameController } from '../Controller/GameController';
import { FbSdk } from '../FbSdk/FbSdk';
import { Message } from '../objects/Message';
import { Configs } from '../Utils/Configs';
const { ccclass, property } = _decorator;

@ccclass('ClientsSocketController')
export class ClientsSocketController extends Component {
    public static URL = 'http://localhost:3000/';
    public socket;
    public static ins: ClientsSocketController;
    public socket_id;

    start() {
        if (ClientsSocketController.ins == null) {
            ClientsSocketController.ins = this;
            director.addPersistRootNode(this.node)
        }
    }


    public ConnectServer(gameController: GameController) {
        //kết nối sever
        this.socket = io(ClientsSocketController.URL);
        this.socket.on(Configs.JOIN_ROOM_GLOBAL, (data) => {
            this.socket_id = data.socket_id
            console.log(this.socket_id, data.socket_id)
            gameController.onShowChatUI();
        })
    }

    // nhận thông báo từ server của chatGlobal
    public listenerServerChatGlobal(chatGlobal: ChatGlobalController) {
        this.socket.on(Configs.SEND_MESSAGE_GLOBAL, (data) => {
            if(chatGlobal.idUserOldChat == null){
                chatGlobal.idUserOldChat = data.inf_user.fbId;
            }
            else{
                if(chatGlobal.idUserOldChat == data.inf_user.fbId){
                    chatGlobal.isSameUser = true;
                }
                else{
                    chatGlobal.isSameUser = false;
                }
                chatGlobal.idUserOldChat = data.inf_user.fbId;
            }
           
            if (FbSdk.ins.dataFb.fbId == data.inf_user.fbId) {
                chatGlobal.addMessageMyUser(data)
            }
            else {
                console.log(data)
                chatGlobal.addMessageOtherUser(data);
            }
        })
    }

    public listenerServerChatLocale(chatLocale: ChatLocalController) {
        this.socket.on(Configs.SEND_MESSAGE_LOCALE, (data) => {
            if(chatLocale.idUserOldChat == null){
                chatLocale.idUserOldChat = data.inf_user.fbId;
            }
            else{
                if(chatLocale.idUserOldChat == data.inf_user.fbId){
                    chatLocale.isSameUser = true;
                }
                else{
                    chatLocale.isSameUser = false;
                }
                chatLocale.idUserOldChat = data.inf_user.fbId;
            }
            if (FbSdk.ins.dataFb.fbId == data.inf_user.fbId) {
                chatLocale.addMessageMyUser(data)
            }
            else {
                chatLocale.addMessageOtherUser(data);
            }
        })
    }

    public listenerServerChatUserToUser(chat: ChatPrivateUserToUser) {

    }

    public listenerServerChatPrivate(chat: ChatPrivateController){
        this.socket.on(Configs.CREATE_ROOM, (data)=>{
            chat.onCreateUserChat(data)
        })
    }

    public listenerChatController(chat: ChatController){
        this.socket.on(Configs.SEND_MESSAGE_PRIVATE, (data) => {
            chat.createNodeChatPrivate1(data)
        })
    }

}


