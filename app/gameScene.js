import Phaser from 'phaser';
import tiles from './tiles.js'
import select_tile from './select_tile.js'
import sheeps from './sheeps.js'
import {grid_size, grid_pos} from './positionHelpers.js'
import {makeInputKeys} from './keyman.js'


let gameScene = new Phaser.Scene('GameScene');

gameScene.init = function (data) {
    console.log(data);
}

gameScene.preload = function () {

    this.load.image('sky','assets/sky/sky.png');
    this.load.image('tile', 'assets/tiles/redograss.png');
    this.load.image('selectTile', 'assets/tiles/redograss_sel.png')
    this.load.image('whiteSheep', 'assets/sheep/white_sheep.png')
    this.load.image('blackSheep', 'assets/sheep/black_sheep.png')
    this.load.image('pinkSheep', 'assets/sheep/pinku_sheep.png')
    
    this.load.image('sheep_sel', 'assets/sheep/sheep_sel.png')

    
}


gameScene.create = function () {   
    
    this.game_grid_size = new grid_size(3,3);

    this.bg = this.add.image(100, 75, 'sky');
    this.bg.setDepth(-600)

    this.grass_tiles = new tiles('tile', this.game_grid_size, this);

    this.grass_select_tile = new select_tile(
        'selectTile', 
        new grid_pos(0,0), 
        this.game_grid_size, 
        this
    );

    this.game_sheeps = new sheeps(this.game_grid_size, this);

    this.cam = this.cameras.main;
    this.keys = makeInputKeys(this);

}


gameScene.update = function () {

    manageInputs(this.keys, this);

    this.grass_select_tile.update()

    this.game_sheeps.update(this.grass_select_tile.grid_pos)


    
}



function manageInputs(keys, game) {
    if (Phaser.Input.Keyboard.JustDown(keys.up)) {
        game.grass_select_tile.grid_pos.x += 1;
    }
    if (Phaser.Input.Keyboard.JustDown(keys.down)) {
        game.grass_select_tile.grid_pos.x -= 1;
    }
    if (Phaser.Input.Keyboard.JustDown(keys.right)) {
        game.grass_select_tile.grid_pos.y += 1;
    }
    if (Phaser.Input.Keyboard.JustDown(keys.left)) {
        game.grass_select_tile.grid_pos.y -= 1;
    }
    if (Phaser.Input.Keyboard.JustDown(keys.w)) {
        game.game_sheeps.place_sheep(game.grass_select_tile.grid_pos, 'whiteSheep');
    }
    if (Phaser.Input.Keyboard.JustDown(keys.b)) {
        game.game_sheeps.place_sheep(game.grass_select_tile.grid_pos, 'blackSheep');
    }
    if (Phaser.Input.Keyboard.JustDown(keys.p)) {
        game.game_sheeps.place_sheep(game.grass_select_tile.grid_pos, 'pinkSheep');
    }
    if (Phaser.Input.Keyboard.JustDown(keys.r)) {
        game.game_sheeps.remove_sheep(game.grass_select_tile.grid_pos);
    }    
}



export default gameScene;