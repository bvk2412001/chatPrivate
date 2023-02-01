import { _decorator, Component, Node, Prefab, Sprite, Label, instantiate, ScrollView } from 'cc';
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
            for (let i = 0; i < this.listUserNode.length; i++) {
                console.log(this.listUserNode[i].getComponent(UserChatController).userId, dataFb.socket_id)
                if (this.listUserNode[i].getComponent(UserChatController).userId == dataFb.socket_id) {
                    console.log("chuan")
                    check = true;
                }
            }
            if (check == false) {
                let userChatNode = instantiate(this.userChatPre)
                userChatNode.getComponent(UserChatController).setUp(dataFb, (dataFb) => {
                    this.onCreateChatPrivate(dataFb)
                });
                this.scrollView.content.addChild(userChatNode)
                this.listUserNode.push(userChatNode)
            }
        }
    }

    start() {
        ClientsSocketController.ins.listenerServerChatPrivate(this);
        console.log("fdafdsf")
    }

    onCreateChatPrivate(dataFb) {
        this.callback(dataFb);
    }

    onCreateUserChat(data) {
        let check = false
        for (let i = 0; i < this.listUserNode.length; i++) {
            if (this.listUserNode[i].getComponent(UserChatController).userId == data.socket_id) {
                console.log("chuan")
                check = true;
            }
        }
        if (check == false) {
            let userChatNode = instantiate(this.userChatPre)
            userChatNode.getComponent(UserChatController).setUp(data, (dataFb) => {
                this.onCreateChatPrivate(dataFb)
            });
            this.scrollView.content.addChild(userChatNode)
            this.listUserNode.push(userChatNode)
        }
    }
}


