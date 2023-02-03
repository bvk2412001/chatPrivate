import { _decorator, Component, Node, Sprite, Label, UITransform, Vec3 } from 'cc';
import dataFb from '../FbSdk/dataFb';
import { FbSdk } from '../FbSdk/FbSdk';
import { ClientsSocketController } from '../Socket/ClientsSocketController';
import { Configs } from '../Utils/Configs';
import { ResourceUtils } from '../Utils/ResourceUtils';
import { Utils } from '../Utils/Utils';
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

    @property(Node)
    nodeInf: Node;


    private callback

    private otherData

    setUpMyUser(dataTransfer) {
        let newString = Utils.cutString(dataTransfer.data.message)
        this.lblMessage.string = newString;
    }

    setUpOtherUser(dataTransfer, callback, isSameUser) {
        this.otherData = dataTransfer

        let newString = Utils.cutString(dataTransfer.data.message)
        this.lblMessage.string = newString
        this.callback = callback;

        if (isSameUser == true) {            
            this.avatarSprite.destroy();
            this.nodeInf.destroy();
        }
        else {
            FbSdk.ins.setImagePhoto((spriframe) => {
                this.avatarSprite.spriteFrame = spriframe
            }, dataTransfer)

            ResourceUtils.loadSprite(Configs.PATH_LOCALE + FbSdk.ins.dataFb.locale, (spriteFrame) => {
                this.locale.spriteFrame = spriteFrame
            })
            //this.node.getComponent(UITransform).setContentSize(720, this.nodeMessage.getComponent(UITransform).contentSize.height + this.nodeInf.getComponent(UITransform).contentSize.height)
            this.lblName.string = dataTransfer.inf_user.sender
        }



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


