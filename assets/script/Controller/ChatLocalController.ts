import { _decorator, Component, Node, ScrollView, EditBox, Prefab, instantiate, Label, Sprite } from 'cc';
import { FbSdk } from '../FbSdk/FbSdk';
import dataTrasfer from '../objects/dataTransfer';
import { Message } from '../objects/Message';
import { ClientsSocketController } from '../Socket/ClientsSocketController';
import { Configs } from '../Utils/Configs';
const { ccclass, property } = _decorator;

@ccclass('ChatLocalController')
export class ChatLocalController extends Component {
    @property(ScrollView)
    scrollView: ScrollView

    @property(EditBox)
    editBox: EditBox

    @property(Prefab)
    messageMyUserPre:Prefab


    @property(Prefab)
    messageOtherUserPre: Prefab

    private callback: CallableFunction
    
    isSameUser: boolean = false;
    idUserOldChat
    start() {
        ClientsSocketController.ins.listenerServerChatLocale(this);
        dataTrasfer.inf_user = FbSdk.ins.dataFb
        ClientsSocketController.ins.socket.emit(Configs.CREATE_ROOM_LOCAL, dataTrasfer)

    }

    update(deltaTime: number) {
        
    }

    setUp(callback ){
        this.callback = callback
    }


    onSendMessage(){

        dataTrasfer.socket_id = ClientsSocketController.ins.socket_id;
        dataTrasfer.inf_user = FbSdk.ins.dataFb;
        dataTrasfer.data= {
            message: this.editBox.string
        }
        ClientsSocketController.ins.socket.emit(Configs.SEND_MESSAGE_LOCALE, dataTrasfer);
        this.editBox.string = ""
    }

    addMessageOtherUser(dataTransfer) {
        let mesageOtherUser = instantiate(this.messageOtherUserPre)
        mesageOtherUser.getComponent(Message).setUpOtherUser(dataTransfer, this.callback, this.isSameUser)
        this.scrollView.content.addChild(mesageOtherUser)
    }

    addMessageMyUser(dataTransfer) {
        let messageMyUser = instantiate(this.messageMyUserPre);
        messageMyUser.getComponent(Message).setUpMyUser(dataTransfer)
        this.scrollView.content.addChild(messageMyUser)
    }
}


