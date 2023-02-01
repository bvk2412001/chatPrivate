import { _decorator, Component, Node, ScrollView, EditBox, Prefab, instantiate } from 'cc';
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

    start() {
        ClientsSocketController.ins.listenerServerChatLocale(this);
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
        console.log(dataTrasfer)
        ClientsSocketController.ins.socket.emit(Configs.SEND_MESSAGE_LOCALE, dataTrasfer);
    }

    addMessageOtherUser(dataTransfer) {
        let mesageOtherUser = instantiate(this.messageOtherUserPre)
        mesageOtherUser.getComponent(Message).setUpOtherUser(dataTransfer, this.callback)
        this.scrollView.content.addChild(mesageOtherUser)
    }

    addMessageMyUser(dataTransfer) {
        let messageMyUser = instantiate(this.messageMyUserPre);
        messageMyUser.getComponent(Message).setUpMyUser(dataTransfer)
        this.scrollView.content.addChild(messageMyUser)
    }
}


