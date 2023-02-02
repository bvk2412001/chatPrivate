import { _decorator, Component, Node, Prefab, Sprite, Label, instantiate, ScrollView } from 'cc';
import { FbSdk } from '../FbSdk/FbSdk';
import { UserChatController } from '../objects/UserChatController';
import { ClientsSocketController } from '../Socket/ClientsSocketController';
const { ccclass, property } = _decorator;

@ccclass('ChatPrivateController')
export class ChatPrivateController extends Component {
    @property(Prefab)
    userChatPre: Prefab

    @property(ScrollView)
    scrollView: ScrollView

    private callback;

    private listUserNode: Node[] = []



    setUp(dataFb, callback) {
        this.callback = callback;

        if (dataFb != null) {
            let check = false;
            let roomName;
            if (parseInt(dataFb.inf_user.fbId) < parseInt(FbSdk.ins.dataFb.fbId)) {
                roomName = dataFb.inf_user.fbId + FbSdk.ins.dataFb.fbId
            }
            else {
                roomName = FbSdk.ins.dataFb.fbId + dataFb.inf_user.fbId
            }
            for (let i = 0; i < this.listUserNode.length; i++) {

                if (this.listUserNode[i].getComponent(UserChatController).userId == roomName) {

                    check = true;
                }
            }
            if (check == false) {
                let userChatNode = instantiate(this.userChatPre)
                userChatNode.getComponent(UserChatController).setUp(dataFb, (dataFb) => {
                    this.onCreateChatPrivate(dataFb)
                });
                userChatNode.getComponent(UserChatController).userId = roomName
                this.scrollView.content.addChild(userChatNode)
                this.listUserNode.push(userChatNode)
            }
        }
    }

    start() {
        ClientsSocketController.ins.listenerServerChatPrivate(this);
    }

    onCreateChatPrivate(dataFb) {
        this.callback(dataFb);
    }

    onCreateUserChat(data) {
        console.log(data)
        let check = false
        let roomName;
        if (parseInt(data.inf_user.fbId) < parseInt(data.data.toUserId)) {
            roomName = data.inf_user.fbId + data.data.toUserId
        }
        else {
            roomName = data.data.toUserId + data.inf_user.fbId
        }
        for (let i = 0; i < this.listUserNode.length; i++) {
            console.log(this.listUserNode[i].getComponent(UserChatController).userId, roomName)
            if (this.listUserNode[i].getComponent(UserChatController).userId == roomName) {
                this.listUserNode[i].getComponent(UserChatController).setMessage(data.data.message)
                check = true;
            }
        }
        if (check == false) {
            let userChatNode = instantiate(this.userChatPre)
            userChatNode.getComponent(UserChatController).setUp(data, (dataFb) => {
                this.onCreateChatPrivate(dataFb)
            });
            userChatNode.getComponent(UserChatController).userId = roomName
            userChatNode.getComponent(UserChatController).setMessage(data.data.message)
            this.scrollView.content.addChild(userChatNode)
            this.listUserNode.push(userChatNode)
        }
    }
}


