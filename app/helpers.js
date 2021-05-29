
export function gridToPixel(grid_pos) {
    
    let ret = new pixel_pos(
        30+(16*grid_pos.x)+(16*grid_pos.y), 
        30-(8*grid_pos.x)+(8*grid_pos.y)
    );

    return ret;
}


export function create_grid(grid_size) {
    let grid = [];

    for (let j = 0; j < grid_size.h; j++) {
        grid.push([])
        for (let i = 0; i < grid_size.w; i++) {
            grid[j].push("empty"); 
        }            
    }
    return grid;
}


export class grid_size {
    constructor(width, height) {
        this.w = width;
        this.h = height;
    }
}

export class pixel_pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


export class grid_pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}