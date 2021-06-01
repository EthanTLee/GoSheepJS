
import Phaser from 'phaser';
import gameScene from './gameScene.js'
import menu from './menuScene.js'
import create_menu from './createMenuScene.js'
import waitingroom_menu from './waitingRoomScene.js'
import join_menu from './JoinMenu.js'
import Nakama from './nakama.js'


var config = {
    type: Phaser.Auto,
    width: 200,
    height: 150,
    pixelArt: true,
    zoom: 4,    
    scene: [menu, create_menu, waitingroom_menu, join_menu, gameScene]
};


var game = new Phaser.Game(config);
game.config.naks = new Nakama();
game.config.naks.initiate();

