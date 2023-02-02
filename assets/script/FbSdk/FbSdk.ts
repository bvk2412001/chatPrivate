import { _decorator, Component, Node, director, random, assetManager, ImageAsset, SpriteFrame, Texture2D, Sprite } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('FbSdk')
export class FbSdk extends Component {
    @property(SpriteFrame)
    avatarSpDef: SpriteFrame
    public static ins: FbSdk;
    private FBInstant;

    public dataFb = {
        fbId: "123",
        sender: "buivankhoa",
        locale: "bd",
        photoURL: "",
    }

    start() {
        this.FBInstant = (typeof FBInstant !== 'undefined') ? FBInstant : null;
        if (FbSdk.ins == null) {
            FbSdk.ins = this;

        }
        director.addPersistRootNode(this.node);
        let random = Math.floor(Math.random() * 321);
        this.dataFb.fbId = random + ""
        console.log(this.dataFb.fbId)
        if (this.FBInstant == null) {
            return;
        }


        this.dataFb.fbId = this.FBInstant.player.getID();
        this.dataFb.sender = this.FBInstant.player.getName();
        this.dataFb.locale = this.setLocale(this.FBInstant.player.getLocale());
        this.dataFb.photoURL = this.FBInstant.player.getPhoto();

    }


    setImagePhoto(callback, data) {
        if (this.FBInstant != null) {
            let remoteUrl = data.inf_user.photoURL;
            assetManager.loadRemote<ImageAsset>(remoteUrl, function (err, imageAsset) {
                const spriteFrame = new SpriteFrame();
                const texture = new Texture2D();
                texture.image = imageAsset;
                spriteFrame.texture = texture;
                callback(spriteFrame);
            })
        }
        else {
            callback(this.avatarSpDef)
        }
    }

    setLocale(locale) {
        let subString = locale.split('_');
        return subString[1].toLowerCase();
    }

}


