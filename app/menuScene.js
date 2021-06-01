import Phaser from 'phaser';
import {makeInputKeys} from './keyman.js'

let menu = new Phaser.Scene('Menu');


menu.preload = function () {
    this.load.image('cursor','assets/menu/cursor.png');
    this.load.image('create','assets/menu/create.png');
    this.load.image('join','assets/menu/join.png');
    this.load.image('bg','assets/menu/menu_bg.png');
}

menu.create = function () {


    this.bg = this.add.image(100, 75, 'bg');
    this.create = this.add.image(60,50, 'create');
    this.create.setOrigin(0,0)
    this.join = this.add.image(60,70, 'join');
    this.join.setOrigin(0,0)
    this.cursor = this.add.image(43, 50, 'cursor')
    this.cursor.setOrigin(0,0)


    this.select_index = 0;
    this.number_of_options = 2;

    this.keys = makeInputKeys(this);
}  


menu.update = function () {

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
                this.scene.start("CreateMenu");
                break;
            case 1:
                this.scene.start("JoinMenu");
        }
    }

    switch (this.select_index) {
        case 0:
            this.cursor.y = 50;
            break;
        case 1:
            this.cursor.y = 70;
            break;
    }
}



export default menu;
