import Phaser from 'phaser';

let waitingroom_menu = new Phaser.Scene('WaitingRoom');

waitingroom_menu.init = function (data) {
    this.num_players = data.num_play;
    console.log(this.num_players);
}

waitingroom_menu.preload = function () {
    this.load.image('bg','assets/menu/menu_bg.png');
    this.load.image('waiting','assets/menu/waiting.png');
}

waitingroom_menu.create = async function () {

    this.bg = this.add.image(100, 75, 'bg');

    this.waiting = this.add.image(20,20, 'waiting')
    this.waiting.setOrigin(0,0);

    const matchid = await this.game.config.naks.createAuthMatch();
    this.game.config.naks.joinMatch(matchid);
}  


waitingroom_menu.update = function () {
    
}


export default waitingroom_menu;
