import {grid_size, pixel_pos, grid_pos, create_grid, gridToPixel} from './helpers.js'

export default class sheeps {
    constructor(grid_size, game) {
        this.grid_size = grid_size;
        this.game = game;
        this.sprite_grid;
        this.position_grid;
    }
    create() {
        this.sprite_grid = create_grid(this.grid_size);
        this.position_grid = create_grid(this.grid_size);    
    }
    place_sheep(grid_pos, spritekey) {
        if (this.position_grid[grid_pos.y][grid_pos.x] != 'empty') {
            return;
        }
        this.position_grid[grid_pos.y][grid_pos.x] = 'sheep';
        
        let pixel_pos = gridToPixel(grid_pos);
        this.sprite_grid[grid_pos.y][grid_pos.x] = this.game.add.sprite(
            pixel_pos.x-2,
            pixel_pos.y-4,
            spritekey
        );
        this.sprite_grid[grid_pos.y][grid_pos.x].setDepth(grid_pos.y);

    }
    remove_sheep(grid_pos) {
        if (this.position_grid[grid_pos.y][grid_pos.x] == 'empty') {
            return;
        }
        this.position_grid[grid_pos.y][grid_pos.x] = 'empty';
        this.sprite_grid[grid_pos.y][grid_pos.x].destroy();   
    }
}