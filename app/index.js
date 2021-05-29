import {Client} from "@heroiclabs/nakama-js";
import { v4 as uuidv4 } from 'uuid';
import Phaser from 'phaser';
import gameScene from './gameScene.js'


let menuScene = new Phaser.Scene('MenuScene');

var config = {
    type: Phaser.Auto,
    width: 200,
    height: 150,
    pixelArt: true,
    zoom: 4,
    
    scene: [gameScene, menuScene]
};

var game = new Phaser.Game(config);




menuScene.preload = function () {
    this.load.image('cursor','assets/menu/cursor.png');
    this.load.image('create','assets/menu/create.png');
    this.load.image('join','assets/menu/join.png');
    this.load.image('bg','assets/menu/menu_bg.png');
}

menuScene.create = function () {
    this.bg = this.add.image(100, 75, 'bg');

    this.create = this.add.image(60,50, 'create');
    this.create.setOrigin(0,0)

    this.join = this.add.image(60,70, 'join');
    this.join.setOrigin(0,0)
    
    this.cursor = this.add.image(43, 50, 'cursor')
    this.cursor.setOrigin(0,0)

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.up_arrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.down_arrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    this.select_index = 0;
    this.number_of_options = 2;
}  


menuScene.update = function () {
    this.select_index = handle_menu_keypresses(
        Phaser.Input.Keyboard, 
        this.select_index, 
        this.down_arrow, 
        this.up_arrow, 
        this.number_of_options
    );

    switch (this.select_index) {
        case 0:
            this.cursor.y = 50;
            break;
        case 1:
            this.cursor.y = 70;
            break;
    }

}

function handle_menu_keypresses(keyboard, select_index, down_key, up_key, number_of_options) {
    if (keyboard.JustDown(down_key)) {
        select_index += 1
        if (select_index >= number_of_options) {
            select_index = 1;
        }
        console.log(select_index);
    }
    if (keyboard.JustDown(up_key)) {
        select_index -= 1
        if (select_index < 0) {
            select_index = 0;
        }
        console.log(select_index);
    }
    return select_index;
}