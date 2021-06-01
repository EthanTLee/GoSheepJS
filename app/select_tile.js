import {grid_size, pixel_pos, grid_pos, create_grid, gridToPixel} from './positionHelpers.js'

export default class select_tile {
    constructor(spritekey, initial_grid_pos, grid_size, game) {
        this.spritekey = spritekey
        this.grid_pos = initial_grid_pos;
        this.pixel_pos = gridToPixel(this.grid_pos);
        this.grid_size = grid_size;
        this.game = game;
        this.sprite = this.game.add.sprite(
            gridToPixel(this.grid_pos).x,
            gridToPixel(this.grid_pos).y,
            this.spritekey
        )
        this.sprite.setDepth(-400);
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