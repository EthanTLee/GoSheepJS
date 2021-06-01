import Phaser from 'phaser';
import menu from './menuScene';

let match_list_scene = new Phaser.Scene('MatchList');



match_list_scene.preload = function () {
    this.load.image('bg','assets/menu/menu_bg.png');
    this.load.image('available_matches', 'assets/menu/available_matches.png');
}

match_list_scene.create = async function () {

    this.bg = this.add.image(100, 75, 'bg');

    this.available = this.add.image(20,20, 'available_matches')
    this.waiting.setOrigin(0,0);

    
}  

match_list_scene.update = function () {
    
}


export default waitingroom_menu;
