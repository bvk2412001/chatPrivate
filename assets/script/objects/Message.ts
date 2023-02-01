import { _decorator, Component, Node, Sprite, Label } from 'cc';
import dataFb from '../FbSdk/dataFb';
import { FbSdk } from '../FbSdk/FbSdk';
import { ClientsSocketController } from '../Socket/ClientsSocketController';
import { Configs } from '../Utils/Configs';
import dataTrasfer from './dataTransfer';
const { ccclass, property } = _decorator;

@ccclass('Message')
export class Message extends Component {
    @property(Sprite)
    avatarSprite: Sprite;

    @property(Label)
    lblMessage: Label

    @property(Label)
    lblName: Label

    @property(Sprite)
    locale: Sprite

    private callback

    private otherData
    setUpMyUser(dataTransfer) {
        this.lblMessage.string = dataTransfer.data.message;
    }

    setUpOtherUser(dataTransfer, callback) {
        this.otherData = dataTransfer
        this.lblMessage.string = dataTransfer.data.message;

        this.callback = callback;
    }
    start() {

    }

    update(deltaTime: number) {

    }

    onChatPrivate() {
        if (this.callback) {
            this.callback(this.otherData);
        }
    }
}


