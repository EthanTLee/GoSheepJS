import Phaser from 'phaser';


let waitingroom_menu = new Phaser.Scene('WaitingRoom');


waitingroom_menu.preload = function () {
    this.load.image('bg','assets/menu/menu_bg.png');
    this.load.image('waiting','assets/menu/waiting.png');
}

waitingroom_menu.create = function () {

    this.bg = this.add.image(100, 75, 'bg');

    this.waiting = this.add.image(20,20, 'waiting')

}  


waitingroom_menu.update = function () {


}


export default create_menu;
