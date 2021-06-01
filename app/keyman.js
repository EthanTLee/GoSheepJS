import Phaser from 'phaser';


export function makeInputKeys(game) {
    let keys = {
        up: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
        down: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
        left: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
        right: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
        x: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
        z: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
        w: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        b: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B),
        p: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P),
        r: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R),
    };

    return keys;
}

