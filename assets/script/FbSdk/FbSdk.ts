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
        this.dataFb.photoURL = this.FBInstant.player.getPhoto();
        this.dataFb.locale = this.setLocale(this.FBInstant.getLocale());
        console.log(this.dataFb);
        

    }


    setImagePhoto(callback, data) {

        if (data.inf_user.photoURL != "") {
            let remoteUrl = data.inf_user.photoURL;
            assetManager.loadRemote<ImageAsset>(remoteUrl, function (err, imageAsset) {
                
                if(err){
                    callback(this.avatarSpDef)
                }
                else{
                    console.log(imageAsset);
                const spriteFrame = new SpriteFrame();
                const texture = new Texture2D();
                texture.image = imageAsset;
                spriteFrame.texture = texture;
                callback(spriteFrame);
                }
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


