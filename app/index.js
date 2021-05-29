
import Phaser from 'phaser';
import gameScene from './gameScene.js'
import menuScene from './menuScene.js'


var config = {
    type: Phaser.Auto,
    width: 200,
    height: 150,
    pixelArt: true,
    zoom: 4,
    
    scene: [gameScene, menuScene]
};


var game = new Phaser.Game(config);

