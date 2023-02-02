import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Utils')
export class Utils extends Component {
    public static cutString(string) {

        let x;
        if (string.length % 40 == 0) {
            x = string.length / 40
        }
        else {
            x = Math.floor(string.length / 40 + 1)
        }

        let newString = "";
        for(let i = 0; i < x; i++){
            newString += string.substr(i * 40, 40) + "\n";
        }

        return newString;

    }
}


