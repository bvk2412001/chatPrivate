import { _decorator, Component, Node, Prefab, SpriteAtlas, Label, Sprite, Input } from 'cc';
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
        this.callback = callback;
        this.dataFb = dataFb
        this.userId = dataFb.socket_id
        console.log(dataFb)
        this.lblName.string = dataFb.inf_user.sender;
        this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this)

    }

    onTouchStart() {
        this.callback(this.dataFb);
    }
    start() {

    }

    update(deltaTime: number) {

    }
}


