import Phaser from 'phaser';
import {makeInputKeys} from './keyman.js'

let join_menu = new Phaser.Scene('JoinMenu');


join_menu.preload = function () {
    this.load.image('bg','assets/menu/menu_bg.png');
    this.load.image('available','assets/menu/available_matches.png');
    this.load.image('match','assets/menu/match.png');

}

join_menu.create = function () {

    this.bg = this.add.image(100, 75, 'bg');

    this.num_of_players = this.add.image(20,20, 'available')
    this.num_of_players.setOrigin(0,0)

    this.cursor = this.add.image(30, 50, 'cursor')
    this.cursor.setOrigin(0,0)

    this.matches = this.game.config.naks.listMatches();

    this.select_index = 0;
    
    this.match_sprites = [];

    this.keys = makeInputKeys(this);

    this.previous_num_options = 0;

    this.time.addEvent({
        delay: 500,
        callback: ()=>{
            // spawn a new apple
        },
        loop: true
    })

}  


join_menu.update = function () {



    
        /*
            this.matches = this.game.config.naks.listMatches();
            this.number_of_options = this.matches.length;
            if (this.number_of_options != this.previous_num_options) {
                this.previous_num_options = this.number_of_options;
                for (let i = 0; i < this.match_sprites.length; i++) {
                    if (this.match_sprites.length == 0) { return; }
                    this.match_sprites[i].this.destroy();
                }
                for (let i = 0; i < this.matches.length; i++) {
                    this.match_sprites.push(this.add.image(70,40+i*20, 'match'));
                }
                console.log("num options: ", this.number_of_options);
            }
            
*/
    





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
                this.scene.start("WaitingRoom", {num_play: 2});
                break;
            case 1:
                this.scene.start("WaitingRoom", {num_play: 3});
                break;
        }
        
    }

    switch (this.select_index) {
        case 0:
            this.cursor.y = 52;
            break;
        case 1:
            this.cursor.y = 72;
            break;
    }
}


export default join_menu;
