import Phaser from 'phaser';
import {makeInputKeys} from './keyman.js'

let create_menu = new Phaser.Scene('CreateMenu');


create_menu.preload = function () {
    this.load.image('bg','assets/menu/menu_bg.png');
    this.load.image('cursor','assets/menu/cursor.png');
    this.load.image('num_of_players', 'assets/menu/num_of_players.png');
    this.load.image('two', 'assets/menu/2.png');
    this.load.image('three', 'assets/menu/3.png');
}

create_menu.create = function () {

    this.bg = this.add.image(100, 75, 'bg');

    this.num_of_players = this.add.image(20,20, 'num_of_players')
    this.num_of_players.setOrigin(0,0)

    this.cursor = this.add.image(30, 50, 'cursor')
    this.cursor.setOrigin(0,0)
    
    this.two = this.add.image(50, 50, 'two')
    this.two.setOrigin(0,0)

    this.three = this.add.image(50, 70, 'three')
    this.three.setOrigin(0,0)

    this.select_index = 0;
    this.number_of_options = 2;

    this.two_player_index = 0;
    this.three_player_index = 1;

    this.keys = makeInputKeys(this);
}  


create_menu.update = function () {

    if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
        this.select_index -= 1
        if (this.select_index <= 0) {
            this.select_index = 0;
        }
    }
    if (Phaser.Input.Keyboard.JustDown(this.keys.down)) {
        this.select_index += 1
        if (this.select_index >= this.number_of_options) {
            this.select_index = this.number_of_options - 1;
        }
    }

    if (Phaser.Input.Keyboard.JustDown(this.keys.z)) {
        switch(this.select_index) {
            case 0:
                this.scene.start("GameScene", {num_play: 2});
                break;
            case 1:
                this.scene.start("GameScene", {num_play: 3});
                break;
        }
        
    }

    switch (this.select_index) {
        case 0:
            this.cursor.y = 52;
            break;
        case 1:
            this.cursor.y = 72;
            break;
    }
}


export default create_menu;
