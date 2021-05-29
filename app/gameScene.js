import Phaser from 'phaser';

import tiles from './tiles.js'
import select_tile from './select_tile.js'
import sheeps from './sheeps.js'
import {grid_size, pixel_pos, grid_pos, create_grid, gridToPixel} from './helpers.js'

let gameScene = new Phaser.Scene('GameScene');


gameScene.preload = function () {

    this.load.image('sky','assets/sky/sky.png');
    this.load.image('tile', 'assets/tiles/redograss.png');
    this.load.image('selectTile', 'assets/tiles/redograss_sel.png')
    this.load.image('whiteSheep', 'assets/sheep/white_sheep.png')
    this.load.image('blackSheep', 'assets/sheep/black_sheep.png')
    this.load.image('pinkSheep', 'assets/sheep/pinku_sheep.png')

}


gameScene.create = function () {   
    
    this.game_grid_size = new grid_size(3,3);


    this.bg = this.add.image(100, 75, 'sky');
    this.bg.setDepth(-600)

    
    this.grass_tiles = new tiles('tile', this.game_grid_size, this);
    this.grass_tiles.create();


    this.grass_select_tile = new select_tile(
        'selectTile', 
        new grid_pos(0,0), 
        this.game_grid_size, 
        this
    );
    this.grass_select_tile.create();


    this.game_sheeps = new sheeps(this.game_grid_size, this);
    this.game_sheeps.create();


    this.cam = this.cameras.main;


    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.right_arrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.left_arrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.up_arrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.down_arrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.w_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.b_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    this.p_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    this.r_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.c_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    this.s_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

}


gameScene.update = function () {

    if (Phaser.Input.Keyboard.JustDown(this.right_arrow)) {
        this.grass_select_tile.grid_pos.y += 1
    }
    if (Phaser.Input.Keyboard.JustDown(this.left_arrow)) {
        this.grass_select_tile.grid_pos.y -= 1
    }
    if (Phaser.Input.Keyboard.JustDown(this.up_arrow)) {
        this.grass_select_tile.grid_pos.x += 1
    }
    if (Phaser.Input.Keyboard.JustDown(this.down_arrow)) {
        this.grass_select_tile.grid_pos.x -= 1
    }
    if (Phaser.Input.Keyboard.JustDown(this.w_key)) {
        this.game_sheeps.place_sheep(this.grass_select_tile.grid_pos, 'whiteSheep');
    }
    if (Phaser.Input.Keyboard.JustDown(this.b_key)) {
        this.game_sheeps.place_sheep(this.grass_select_tile.grid_pos, 'blackSheep');
    }
    if (Phaser.Input.Keyboard.JustDown(this.p_key)) {
        this.game_sheeps.place_sheep(this.grass_select_tile.grid_pos, 'pinkSheep');
    }
    if (Phaser.Input.Keyboard.JustDown(this.r_key)) {
        this.game_sheeps.remove_sheep(this.grass_select_tile.grid_pos);
    }
    if (Phaser.Input.Keyboard.JustDown(this.c_key)) {
        this.naks.startMatchMaker();
    }
    if (Phaser.Input.Keyboard.JustDown(this.s_key)) {
        this.naks.send_sheep();
    }

    this.grass_select_tile.update()
}


























export default gameScene;