import { _decorator, Component, Node, Input, Sprite, SpriteFrame, Prefab, instantiate, Label } from 'cc';
import { FbSdk } from '../FbSdk/FbSdk';
import { ClientsSocketController } from '../Socket/ClientsSocketController';
import { Configs } from '../Utils/Configs';
import { ResourceUtils } from '../Utils/ResourceUtils';
import { ChatGlobalController } from './ChatGlobalController';
import { ChatLocalController } from './ChatLocalController';
import { ChatPrivateController } from './ChatPrivateController';
import { ChatPrivateUserToUser } from './ChatPrivateUserToUser';
const { ccclass, property } = _decorator;

@ccclass('ChatController')
export class ChatController extends Component {
    @property(Node)
    private btnChatGlobal: Node;

    @property(Node)
    private btnChatLocal: Node

    @property(Node)
    private btnChatPrivate: Node

    @property(SpriteFrame)
    listSpriFrameButtonChatState: SpriteFrame[] = [];

    @property(Prefab)
    chatGlobalPre: Prefab

    @property(Prefab)
    chatLocalPre: Prefab

    @property(Prefab)
    chatPrivatePrefab: Prefab

    @property(Prefab)
    chatPrivateUserToUser: Prefab

    @property(Label)
    lblLocaleName: Label

    @property(Sprite)
    spriteLocale: Sprite

    private chatGlobalNode: Node
    private chatLocalNode: Node
    private chatPrivate: Node
    listChatUserToUser: Node[] = [];
    start() {
        this.lblLocaleName.string = FbSdk.ins.dataFb.locale;
        ClientsSocketController.ins.listenerChatController(this);
        this.init();
        ResourceUtils.loadSprite(Configs.PATH_LOCALE + FbSdk.ins.dataFb.locale, (spriteFrame) => {
            this.spriteLocale.spriteFrame = spriteFrame
        })
    }

    update(deltaTime: number) {

    }


    init() {
        //
        this.chatGlobalNode = instantiate(this.chatGlobalPre);
        this.chatGlobalNode.getComponent(ChatGlobalController).setUp((dataUser) => {
            this.onBtnChatPrivate(dataUser);
        })
        this.node.addChild(this.chatGlobalNode);
        //
        this.chatLocalNode = instantiate(this.chatLocalPre);
        this.chatLocalNode.getComponent(ChatLocalController).setUp((dataUser) => {
            this.onBtnChatPrivate(dataUser);
        })
        this.node.addChild(this.chatLocalNode);

        setTimeout(() => {
            this.chatLocalNode.active = false
        }, 100)


        //
        this.chatPrivate = instantiate(this.chatPrivatePrefab);
        this.chatPrivate.getComponent(ChatPrivateController).setUp(null, (dataFb) => {
            this.createNodeChatPrivate(dataFb);
        })
        this.node.addChild(this.chatPrivate);
        setTimeout(() => {
            this.chatPrivate.active = false
        }, 100)

        //
        this.btnChatGlobal.getComponent(Sprite).spriteFrame = this.listSpriFrameButtonChatState[Configs.SPRITE_FRAME_CHOISE_BUTTON_CHAT_STATE];
        this.btnChatGlobal.on(Input.EventType.TOUCH_START, this.onBtnChatGlobal, this);
        this.btnChatLocal.on(Input.EventType.TOUCH_START, this.onBtnChatLocal, this);
        this.btnChatPrivate.on(Input.EventType.TOUCH_START, this.onTouchChatPrivate, this);
    }

    //chon nut button global
    onBtnChatGlobal() {
        if (this.chatGlobalNode == null) {
            this.chatGlobalNode = instantiate(this.chatGlobalPre);
            this.chatGlobalNode.getComponent(ChatGlobalController).setUp((dataUser) => {
                this.onBtnChatPrivate(dataUser);
            })
            this.node.addChild(this.chatGlobalNode);
        }
        else {
            this.chatGlobalNode.active = true
        }
        if (this.chatLocalNode != null) {
            this.chatLocalNode.active = false
        }

        if (this.chatPrivate != null) {
            this.chatPrivate.active = false
        }
        this.btnChatGlobal.getComponent(Sprite).spriteFrame = this.listSpriFrameButtonChatState[Configs.SPRITE_FRAME_CHOISE_BUTTON_CHAT_STATE];
        this.btnChatLocal.getComponent(Sprite).spriteFrame = this.listSpriFrameButtonChatState[Configs.SPRITE_FRAME_NOT_CHOISE_BUTTON_CHAT_STATE];
        this.btnChatPrivate.getComponent(Sprite).spriteFrame = this.listSpriFrameButtonChatState[Configs.SPRITE_FRAME_NOT_CHOISE_BUTTON_CHAT_STATE];
    }

    //chon nut button local
    onBtnChatLocal() {
        if (this.chatLocalNode == null) {
            this.chatLocalNode = instantiate(this.chatLocalPre);
            this.chatLocalNode.getComponent(ChatLocalController).setUp((dataUser) => {
                this.onBtnChatPrivate(dataUser);
            })
            this.node.addChild(this.chatLocalNode);
        }
        else {
            this.chatLocalNode.active = true;
        }
        if (this.chatGlobalNode != null) {
            this.chatGlobalNode.active = false
        }

        if (this.chatPrivate != null) {
            this.chatPrivate.active = false
        }

        this.btnChatGlobal.getComponent(Sprite).spriteFrame = this.listSpriFrameButtonChatState[Configs.SPRITE_FRAME_NOT_CHOISE_BUTTON_CHAT_STATE];
        this.btnChatLocal.getComponent(Sprite).spriteFrame = this.listSpriFrameButtonChatState[Configs.SPRITE_FRAME_CHOISE_BUTTON_CHAT_STATE];
        this.btnChatPrivate.getComponent(Sprite).spriteFrame = this.listSpriFrameButtonChatState[Configs.SPRITE_FRAME_NOT_CHOISE_BUTTON_CHAT_STATE];
    }

    //chon nut button private
    onTouchChatPrivate(dataUser) {
        if (this.chatPrivate == null) {
            this.chatPrivate = instantiate(this.chatPrivatePrefab);
            this.chatPrivate.getComponent(ChatPrivateController).setUp(null, (dataFb) => {
                this.createNodeChatPrivate(dataFb);
            })
            this.node.addChild(this.chatPrivate);
        }
        else {
            this.chatPrivate.active = true;
        }
        if (this.chatGlobalNode != null) {
            this.chatGlobalNode.active = false
        }

        if (this.chatLocalNode != null) {
            this.chatLocalNode.active = false
        }
        this.btnChatGlobal.getComponent(Sprite).spriteFrame = this.listSpriFrameButtonChatState[Configs.SPRITE_FRAME_NOT_CHOISE_BUTTON_CHAT_STATE];
        this.btnChatLocal.getComponent(Sprite).spriteFrame = this.listSpriFrameButtonChatState[Configs.SPRITE_FRAME_NOT_CHOISE_BUTTON_CHAT_STATE];
        this.btnChatPrivate.getComponent(Sprite).spriteFrame = this.listSpriFrameButtonChatState[Configs.SPRITE_FRAME_CHOISE_BUTTON_CHAT_STATE];
    }
    onBtnChatPrivate(dataUser) {
        if (this.chatPrivate == null) {
            this.chatPrivate = instantiate(this.chatPrivatePrefab);
            this.chatPrivate.getComponent(ChatPrivateController).setUp(dataUser, (dataFb) => {
                this.createNodeChatPrivate(dataFb);
            })
            this.node.addChild(this.chatPrivate);
        }
        else {
            this.chatPrivate.getComponent(ChatPrivateController).setUp(dataUser, (dataFb) => {
                this.createNodeChatPrivate(dataFb);
            })
            this.chatPrivate.active = true;
        }
        if (this.chatGlobalNode != null) {
            this.chatGlobalNode.active = false
        }

        if (this.chatLocalNode != null) {
            this.chatLocalNode.active = false
        }
        this.btnChatGlobal.getComponent(Sprite).spriteFrame = this.listSpriFrameButtonChatState[Configs.SPRITE_FRAME_NOT_CHOISE_BUTTON_CHAT_STATE];
        this.btnChatLocal.getComponent(Sprite).spriteFrame = this.listSpriFrameButtonChatState[Configs.SPRITE_FRAME_NOT_CHOISE_BUTTON_CHAT_STATE];
        this.btnChatPrivate.getComponent(Sprite).spriteFrame = this.listSpriFrameButtonChatState[Configs.SPRITE_FRAME_CHOISE_BUTTON_CHAT_STATE];
    }

    onBackToGame(event: TouchEvent, arg) {
        let status = Number(arg);
        if (status == 0) {
            this.node.active = false
        }
        else {
            this.node.active = true;
        }
    }

    createNodeChatPrivate(dataFb) {
        let check = false;
        for (let i = 0; i < this.listChatUserToUser.length; i++) {
            if (this.listChatUserToUser[i].getComponent(ChatPrivateUserToUser).roomName == dataFb.data.roomName) {
                check = true;
                this.listChatUserToUser[i].active = true;
            }
        }
        if (check == false) {
            let chatPre = instantiate(this.chatPrivateUserToUser)
            chatPre.getComponent(ChatPrivateUserToUser).setUp(dataFb, () => {
                this.onTransferChat();
            })
            chatPre.getComponent(ChatPrivateUserToUser).lbluserName.string = dataFb.inf_user.sender
            let roomName;
            if (parseInt(dataFb.inf_user.fbId) < parseInt(FbSdk.ins.dataFb.fbId)) {
                roomName = dataFb.inf_user.fbId + FbSdk.ins.dataFb.fbId
            }
            else {
                roomName = FbSdk.ins.dataFb.fbId + dataFb.inf_user.fbId
            }
            chatPre.getComponent(ChatPrivateUserToUser).roomName = roomName

            this.node.parent.addChild(chatPre)
            this.node.active = false

            this.listChatUserToUser.push(chatPre)
        }
    }

    createNodeChatPrivate1(dataFb) {
        let check = false;
        for (let i = 0; i < this.listChatUserToUser.length; i++) {
            if (this.listChatUserToUser[i].getComponent(ChatPrivateUserToUser).roomName == dataFb.data.roomName) {
                check = true;
                let chatPri = this.listChatUserToUser[i].getComponent(ChatPrivateUserToUser);
                if(chatPri.idUserOldChat == null){
                    chatPri.idUserOldChat = dataFb.inf_user.fbId;
                }
                else{
                    if(chatPri.idUserOldChat == dataFb.inf_user.fbId){
                        chatPri.isSameUser = true;
                    }
                    else{
                        chatPri.isSameUser = false;
                    }
                    chatPri.idUserOldChat = dataFb.inf_user.fbId;
                }
                if (FbSdk.ins.dataFb.fbId == dataFb.inf_user.fbId) {
                    chatPri.addMessageMyUser(dataFb)
                }
                else {
                    chatPri.addMessageOtherUser(dataFb, chatPri.isSameUser);
                }
            }
        }
        if (check == false) {
            let chatPre = instantiate(this.chatPrivateUserToUser)
            let chatPri =  chatPre.getComponent(ChatPrivateUserToUser);
            chatPri.setUp(dataFb, () => {
                this.onTransferChat();
            })
            chatPri.roomName = dataFb.data.roomName
            chatPri.lbluserName.string = dataFb.inf_user.sender
            chatPri.isSameUser = false
            chatPri.idUserOldChat = dataFb.inf_user.fbId
            chatPri.addMessageOtherUser(dataFb, chatPre.getComponent(ChatPrivateUserToUser).isSameUser)
            this.node.parent.addChild(chatPre)
            this.listChatUserToUser.push(chatPre)
            chatPre.active = false




        }
    }
    onTransferChat() {
        this.node.active = true;
    }

}


