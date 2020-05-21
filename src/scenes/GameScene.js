class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
    }

    init() {
        this.scene.launch('ui');
    }

    create() {
        this.physics.world.setBounds(0, 0, 6400, 640);
        this.createMap();
        this.player = this.createPlayer();
        this.physics.add.collider(this.solids, this.player);
    }

    update(dt) {
        this.player.update(dt);
    }

    createPlayer() {
        return new Player({
            scene: this,
            x: this.scale.width / 2,
            y: this.scale.height / 2
        });
    }

    createMap() {
        this.map = this.add.tilemap('levelOne');
        this.tileset = this.map.addTilesetImage('PlatformTiles', 'tiles', 64, 64, 1, 2);
        this.solids = this.map.createStaticLayer('Solids', this.tileset, 0, 0);
        this.death = this.map.createStaticLayer('Death', this.tileset, 0, 0);
        this.solids
        this.solids.setCollisionByProperty({collides: true});
    }
}
