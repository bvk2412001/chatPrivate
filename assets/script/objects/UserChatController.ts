import { _decorator, Component, Node, Prefab, SpriteAtlas, Label, Sprite, Input } from 'cc';
import { FbSdk } from '../FbSdk/FbSdk';
const { ccclass, property } = _decorator;

@ccclass('UserChatController')
export class UserChatController extends Component {
    @property(Sprite)
    spriteUser: Sprite

    @property(Label)
    lblMessage: Label

    @property(Label)
    lblName: Label

    private callback;
    private dataFb;

    userId;
    setUp(dataFb, callback) {
        FbSdk.ins.setImagePhoto((spriteFrame) => {
            this.spriteUser.spriteFrame = spriteFrame;
        }, dataFb)
        this.callback = callback;
        this.dataFb = dataFb
        this.userId = dataFb.socket_id
        this.lblName.string = dataFb.inf_user.sender;
        this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this)

    }

    onTouchStart() {
        this.callback(this.dataFb);
    }
    start() {

    }

    setMessage(string) {
        if(string.length > 30){
            string = string.substr(0, 30) + "..."
        }
        this.lblMessage.string = string
    }

    update(deltaTime: number) {

    }
}


