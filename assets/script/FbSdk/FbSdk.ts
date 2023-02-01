import { _decorator, Component, Node, director, random } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('FbSdk')
export class FbSdk extends Component {
    public static ins: FbSdk;
    private FBInstant;

    public dataFb = {
        fbId : "123",
        sender: "",
        locale: "vi",
        photoURL: "",
    }

    start(){
        //this.FBInstant = (typeof FBInstant !== 'undefined') ? FBInstant : null;
        if(FbSdk.ins == null){
            FbSdk.ins = this;
        }
        director.addPersistRootNode(this.node);
        // if(this.FBInstant == null){
        //     return;
        // }
        
        let random = Math.floor(Math.random() * 11);
       
        this.dataFb.fbId = random + ""
        console.log(this.dataFb.fbId)
        // dataFb.fbId = this.FBInstant.player.getID();
        // dataFb.sender = this.FBInstant.player.getName();
        // dataFb.locale = this.FBInstant.player.getLocale();
        // dataFb.photoURL = this.FBInstant.player.getPhoto();

    }

}


