const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 640,
    backgroundColor: 0x87ceeb,
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                y: 1000
            }
        }
    },
    scene: [BootScene, GameScene, UserInterface]
};

const game = new Phaser.Game(config);