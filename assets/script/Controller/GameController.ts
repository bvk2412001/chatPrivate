import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { ClientsSocketController } from '../Socket/ClientsSocketController';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(Node)
    chatNode: Node

    @property(Node)
    gamePlay: Node

    @property (Prefab)
    chatPre: Prefab;

    private chatNodeController : Node | null = null;

    start() {

    }

    update(deltaTime: number) {
        
    }

    onConnectSeverChat(){
        ClientsSocketController.ins.ConnectServer(this);
    }

    onShowChatUI(){
        if(this.chatNodeController == null){
            this.chatNodeController = instantiate(this.chatPre)
            this.chatNode.addChild(this.chatNodeController)
        }
        else{
            this.chatNode.addChild(this.chatNodeController);
        }

        this.gamePlay.active = false;
    }

}


