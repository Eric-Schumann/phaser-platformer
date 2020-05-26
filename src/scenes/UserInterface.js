class UserInterface extends Phaser.Scene {
    constructor() {
        super({ key: 'ui' });
    }

    create() {
        this.timerText = this.add.text(this.scale.width - 180, 15, '', {
            fontSize: '32px'
        }).setOrigin(0);

        this.registry.events.on('changedata', (parent, key, data) => {
            if(key === 'timer') {
                this.timerText.setText(`Timer: ${data}`);
            }
        });
    }
}