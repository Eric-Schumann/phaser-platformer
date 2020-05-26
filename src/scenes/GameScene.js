class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
    }

    init() {
        this.scene.launch('ui');
    }

    create() {
        this.createMap();
        this.createPlayer();
        this.addCollisions();
        this.addLevelMusic();
    }

    update(dt) {
        this.player.update(dt);
    }

    createPlayer() {
        this.player = new Player({
            scene: this,
            x: 64,
            y: this.scale.height - 100
        });
    }

    createMap() {
        this.map = this.add.tilemap('levelOne');
        this.tileset = this.map.addTilesetImage('PlatformTiles', 'tiles', 64, 64, 1, 2);
        this.solids = this.map.createStaticLayer('Solids', this.tileset, 0, 0);
        this.death = this.map.createStaticLayer('Death', this.tileset, 0, 0);
        this.solids.setCollisionByProperty({collides: true});
    }

    addCollisions() {
        this.physics.add.collider(this.solids, this.player);
        this.physics.add.collider(this.solids, this.player);
    }

    addLevelMusic() {
        this.sound.add("music").play({
            loop: true,
            volume: 0.25
        });
    }
}
