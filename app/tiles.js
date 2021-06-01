import {grid_size, pixel_pos, grid_pos, create_grid, gridToPixel} from './positionHelpers.js'

export default class tiles {
    constructor(spritekey, grid_size, game) {
        this.game = game;
        this.grid_size = grid_size;
        this.spritekey = spritekey;
        this.sprites = this.game.add.group();

        for (let j = 0; j < this.grid_size.h; j ++) {
            for (let i = 0; i < this.grid_size.w; i++) {
                let tile_grid_pos = new grid_pos(i, j);
                let tile_pixel_pos = gridToPixel(tile_grid_pos);
                this.sprites.create(tile_pixel_pos.x,tile_pixel_pos.y, this.spritekey);
            }
        }
        this.sprites.setDepth(-500)
    }
}