import {grid_size, pixel_pos, grid_pos, create_grid, gridToPixel} from './positionHelpers.js'

export default class sheeps {

    constructor(grid_size, game) {
        this.grid_size = grid_size;
        this.game = game;
        this.sprite_grid = create_grid(this.grid_size);
        this.position_grid = create_grid(this.grid_size);
    }
    update(sel_grid_pos) {
        for (let j = 0; j < this.grid_size.h; j ++) {
            for (let i = 0; i < this.grid_size.w; i++) {
                if (this.position_grid[j][i] != 'empty') {
                    if (i == sel_grid_pos.x && j == sel_grid_pos.y) {

                        this.sprite_grid[j][i].setTint(0xe6ccff)    
                    }
                    else {
                        this.sprite_grid[j][i].clearTint()
                    }
                }
            }
        }
        
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

    change_sprite(grid_pos, sprite_key) {
        if (this.position_grid[grid_pos.y][grid_pos.x] == 'empty') {
            return;
        }
        this.sprite_grid[grid_pos.y][grid_pos.x].setTexture(sprite_key);   
    }
}