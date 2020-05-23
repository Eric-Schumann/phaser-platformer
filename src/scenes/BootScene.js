class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'boot' });
    }

    preload() {
        this.loadImages();
        this.loadTileMaps();
        this.loadSounds();
        this.load.on('complete', () => {
            this.scene.start('game');
        });
    }

    loadImages() {
        this.load.image('playerWalk1', 'src/assets/images/player/platformChar_walk1.png');
        this.load.image('playerWalk2', 'src/assets/images/player/platformChar_walk2.png');
        this.load.image('playerIdle', 'src/assets/images/player/platformChar_idle.png');
        this.load.image('playerJump', 'src/assets/images/player/platformChar_jump.png');
        this.load.image('tiles', 'src/assets/images/maps/tiles_extruded.png');
    }

    loadTileMaps() {
        this.load.tilemapTiledJSON('levelOne', 'src/assets/images/maps/LevelOne.json');
    }
    
    loadSounds() {
        this.load.audio("jump", ["src/assets/audio/phaseJump3.ogg"]);
        this.load.audio("music", [
            "https://labs.phaser.io/assets/audio/CatAstroPhi_shmup_normal.mp3"
        ]);
    }
}
