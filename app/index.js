import {Client} from "@heroiclabs/nakama-js";
import { v4 as uuidv4 } from 'uuid';
import Phaser from 'phaser';



var config = {
    type: Phaser.Auto,
    width: 200,
    height: 150,
    pixelArt: true,
    zoom: 4,
    
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);




function preload () {
    this.load.image('sky','assets/sky.png');
    this.load.image('tile', 'assets/redograss.png');
    this.load.image('selectTile', 'assets/redograss_sel.png')
    this.load.image('whiteSheep', 'assets/white_sheep.png')
    console.log("preload finished");
}

function create () {   
    
    
    this.add.image(100, 75, 'sky');


    this.game_grid_size = new grid_size(3,3);


    this.grass_tiles = new tiles('tile', this.game_grid_size, this)
    this.grass_tiles.create();


    this.grass_select_tile = new select_tile(
        'selectTile', 
        new grid_pos(0,0), 
        this.game_grid_size, 
        this
    );
    this.grass_select_tile.create();


    this.game_sheeps = new sheeps('whiteSheep', this.game_grid_size, this);
    this.game_sheeps.create();

    this.cam = this.cameras.main;
    

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.right_arrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.left_arrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.up_arrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.down_arrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);


}

function update () {

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
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        this.game_sheeps.place_sheep(this.grass_select_tile.grid_pos);
    }


    this.grass_select_tile.update()

}

class pixel_pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class grid_pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


class grid_size {
    constructor(width, height) {
        this.w = width;
        this.h = height;
    }
}

class tiles {
    constructor(spritekey, grid_size, game) {
        this.game = game;
        this.grid_size = grid_size;
        this.spritekey = spritekey;
        this.sprites;

    }

    create() {

        this.sprites = this.game.add.group();

        for (let j = 0; j < this.grid_size.h; j ++) {
            for (let i = 0; i < this.grid_size.w; i++) {
                let tile_grid_pos = new grid_pos(i, j);
                let tile_pixel_pos = gridToPixel(tile_grid_pos);
                this.sprites.create(tile_pixel_pos.x,tile_pixel_pos.y, this.spritekey);
            }
        }

    }

}

class select_tile {
    constructor(spritekey, initial_grid_pos, grid_size, game) {
        this.spritekey = spritekey
        this.grid_pos = initial_grid_pos;
        this.grid_size = grid_size;
        this.game = game;
        this.sprite;
        this.pixel_pos;

    }

    create() {
        this.sprite = this.game.add.sprite(
            gridToPixel(this.grid_pos).x,
            gridToPixel(this.grid_pos).y,
            this.spritekey
        )
    }

    update() {
        this.grid_pos = this.enforce_boundaries(this.grid_pos, this.grid_size);
        this.pixel_pos = gridToPixel(this.grid_pos);
    
        this.sprite.x = this.pixel_pos.x;
        this.sprite.y = this.pixel_pos.y;
    }

    enforce_boundaries(gridpt, gridsize) {
        if (gridpt.x < 0) {
            gridpt.x = 0;
        }
    
        if (gridpt.y < 0) {
            gridpt.y = 0;    
        }
    
        if (gridpt.x > gridsize.w - 1) {
            gridpt.x = gridsize.w - 1;
        }
    
        if (gridpt.y > gridsize.h - 1) {
            gridpt.y = gridsize.h - 1;
        }
    
        return gridpt;
    }

}

class sheeps {
    constructor(spritekey, grid_size, game) {
        this.spritekey = spritekey;
        this.grid_size = grid_size;
        this.game = game;
        this.sprites;
        this.grid;
    }

    create() {
        this.sprites = this.game.add.group();
        this.grid = create_grid(this.grid_size.w, this.grid_size.h);    
    }


    place_sheep(grid_pos) {
        let pixel_pos = gridToPixel(grid_pos);
        this.grid[grid_pos.y][grid_pos.x] = 'sheep';
        this.sprites.create(pixel_pos.x-2,pixel_pos.y-4, this.spritekey)    
    }

    remove_sheep(grid_pos) {
        this.grid[grid_pos.y][grid_pos.x] = 'empty';
    }
}





function remove_all_from_group(group) {
    for (let i = 0; i < group.total; i++) {
        group.remove(group.children[i]);
    }
    return group;
}

function group_from_grid(grid) {

    let group = this.add.group()
    for (let j = 0; j < grid.length; j++) {
        for (let i = 0; i < grid[j].length; i++) {
            let gridpos = {x: i, y: j};
            let pixelpos = gridToPixel(gridpos);
            group.create(pixelpos['x'], pixelpos['y'], grid[j][i]);
        }            
    }

    return group;
}

function create_grid(width, height) {
    let grid = [];

    for (let j = 0; j < height; j++) {
        grid.push([])
        for (let i = 0; i < width; i++) {
            grid[j].push("empty"); 
        }            
    }

    return grid;
}


function gridToPixel(grid_pos) {
    
    let ret = new pixel_pos(
        30+(16*grid_pos.x)+(16*grid_pos.y), 
        30-(8*grid_pos.x)+(8*grid_pos.y)
    );

    return ret;
}

function pixelToGrid(pixelpt) {

    let gridPos = {
        y: Math.round((pixelpt['x'] + 2*pixelpt['y'] - 60) / 32),
        x: Math.round((pixelpt['x'] - 2*pixelpt['y'] + 20) / 32)
    };

    return gridPos;
}













class Game {
    constructor() {
        this.naks = new Nakama;


    }

    initiate = async() => {
        await this.naks.initiate();
        await this.start_listening();
    }

    start_listening = async() => {

        this.naks.socket.onmatchpresence = (matchpresence) => {

            console.info("Received match presence update:", matchpresence);
        }

        this.naks.socket.onmatchdata = (data) => {
            console.log("data received: ", data.data)
            if (data.data == "sheep") {
                this.in_game.add.image(20,20,'sheep');
            }
        }

        console.log("listening");
    }

    send_sheep = async() => {
        let opcode = 1;
        let data = "sheep";
        this.naks.socket.sendMatchState(this.naks.match.match_id, opcode, data);
    }
}


class Nakama {
    constructor() {
        this.useSSL = false;
        this.verboseLog = false
        this.client = new Client("defaultkey", "127.0.0.1", "7350", this.useSSL);
        
        this.session;

        this.socket;
        this.match;

    }

    initiate = async() => {
        const create = true;    
        const username = uuidv4();    
        this.session = await this.client.authenticateCustom(username, create, username);
        console.log("session user id: ", this.session.user_id);
        this.socket = this.client.createSocket(this.useSSL, this.verboseLog);

        
        await this.socket.connect(this.session);
        console.log("socket connected");
    }

    createMatch = async() => {
        this.match = await this.socket.createMatch();
        console.log("match id: ", this.match.match_id);
    }

    joinMatch = async(id) => {
        this.match = await this.socket.joinMatch(id);
    }

}


//window.good_game = new Game;



//console.log(response.match_id)

