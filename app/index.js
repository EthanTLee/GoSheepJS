
import Phaser from 'phaser';
import gameScene from './gameScene.js'
import menu from './menuScene.js'
import create_menu from './createMenuScene.js'


var config = {
    type: Phaser.Auto,
    width: 200,
    height: 150,
    pixelArt: true,
    zoom: 4,
    
    scene: [menu, create_menu, gameScene]
    //scene: [gameScene, menu]

};


var game = new Phaser.Game(config);

