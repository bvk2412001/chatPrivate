import { _decorator, Component, Node, Label, Sprite, ScrollView, EditBox, Prefab, instantiate } from 'cc';
import { FbSdk } from '../FbSdk/FbSdk';
import dataTrasfer from '../objects/dataTransfer';
import { Message } from '../objects/Message';
import { ClientsSocketController } from '../Socket/ClientsSocketController';
import { Configs } from '../Utils/Configs';
const { ccclass, property } = _decorator;

@ccclass('ChatPrivateUserToUser')
export class ChatPrivateUserToUser extends Component {
    @property(Label)
    lbluserName: Label

    @property(Sprite)
    spriteLocale: Sprite

    @property(ScrollView)
    scrollView: ScrollView

    @property(EditBox)
    editBox: EditBox

    @property(Prefab)
    messageUserPre: Prefab

    @property(Prefab)
    messageOtherUserPre: Prefab

    roomName;
    private dataFb
    private callback
    start() {
        ClientsSocketController.ins.listenerServerChatUserToUser(this)
    }

    update(deltaTime: number) {

    }

    setUp(dataFb, callback){

        this.dataFb = dataFb
        this.callback = callback;
    }

    onSendMessage(){
        dataTrasfer.socket_id = ClientsSocketController.ins.socket_id
        dataTrasfer.inf_user = FbSdk.ins.dataFb;
        dataTrasfer.data= {
            socket_id_toUser: this.dataFb.socket_id,
            toUserId: this.dataFb.inf_user.fbId,
            message: this.editBox.string
        }
        ClientsSocketController.ins.socket.emit(Configs.SEND_MESSAGE_PRIVATE, dataTrasfer);
    }

    onBackChat(){
        this.callback();
        this.node.active = false;
    }

    addMessageOtherUser(dataTransfer) {
        let mesageOtherUser = instantiate(this.messageOtherUserPre)
        mesageOtherUser.getComponent(Message).setUpOtherUser(dataTransfer, null)
        this.scrollView.content.addChild(mesageOtherUser)
    }

    addMessageMyUser(dataTransfer) {
        let messageMyUser = instantiate(this.messageUserPre);
        messageMyUser.getComponent(Message).setUpMyUser(dataTransfer)
        this.scrollView.content.addChild(messageMyUser)
    }
}


