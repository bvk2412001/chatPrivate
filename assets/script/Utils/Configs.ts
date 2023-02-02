import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Configs')
export class Configs extends Component {
    //state button 1 : choise, 2 : not choise
    public static SPRITE_FRAME_CHOISE_BUTTON_CHAT_STATE = 1
    public static SPRITE_FRAME_NOT_CHOISE_BUTTON_CHAT_STATE = 2

    //comunication sever-client
    public static JOIN_ROOM_GLOBAL = "JOIN_ROOM_GLOBAL"
    public static SEND_MESSAGE_GLOBAL = "SEND_MESSAGE_GLOBAL";
    public static SEND_MESSAGE_LOCALE = "SEND_MESSAGE_LOCALE";
    public static SEND_MESSAGE_PRIVATE = "SEND_MESSAGE_PRIVATE";
    public static CREATE_ROOM = "CREATE_ROOM";
    public static CREATE_ROOM_LOCAL = "CREATE_ROOM_LOCAL";

    //
    public static PATH_LOCALE = "flag/"

}


