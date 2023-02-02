import { _decorator, Component, Node, EditBox, Prefab, instantiate, ScrollView } from 'cc';
import { FbSdk } from '../FbSdk/FbSdk';
import dataTrasfer from '../objects/dataTransfer';
import { Message } from '../objects/Message';
import { ClientsSocketController } from '../Socket/ClientsSocketController';
import { Configs } from '../Utils/Configs';
const { ccclass, property } = _decorator;

@ccclass('ChatGlobalController')
export class ChatGlobalController extends Component {
    @property(EditBox)
    editBox: EditBox;

    @property(Prefab)
    messageMyUserPre: Prefab

    @property(Prefab)
    mesageOtherUser: Prefab

    @property(ScrollView)
    scrollView: ScrollView

    private callback;

    start() {
        ClientsSocketController.ins.listenerServerChatGlobal(this);
    }

    update(deltaTime: number) {

    }

    setUp(callback) {
        this.callback = callback

    }

    //sendMessage
    onSendMessage() {
        if(this.editBox.string.length <= 160){
            dataTrasfer.socket_id = ClientsSocketController.ins.socket_id;
            dataTrasfer.inf_user = FbSdk.ins.dataFb
            dataTrasfer.data = {
                message: this.editBox.string
            }
            ClientsSocketController.ins.socket.emit(Configs.SEND_MESSAGE_GLOBAL, dataTrasfer)

            this.editBox.string = ""
        }


    }

    //addMessageOtherUser
    addMessageOtherUser(dataTransfer) {
        let mesageOtherUser = instantiate(this.mesageOtherUser)
        mesageOtherUser.getComponent(Message).setUpOtherUser(dataTransfer, this.callback)
        this.scrollView.content.addChild(mesageOtherUser)
    }

    addMessageMyUser(dataTransfer) {
        let messageMyUser = instantiate(this.messageMyUserPre);
        messageMyUser.getComponent(Message).setUpMyUser(dataTransfer)
        this.scrollView.content.addChild(messageMyUser)
    }
}


