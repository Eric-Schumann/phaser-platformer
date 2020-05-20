class UserInterface extends Phaser.Scene {
    constructor() {
        super({ key: 'ui' });
    }

    create() {
        this.debugText = this.add.text(0, 10, '', {
            fontSize: '32px'
        }).setOrigin(0);
        this.registry.events.on('changedata', (parent, key, data) => {
            if(key === 'debugData') {

                let text = `X: ${data.x} Y: ${data.y}\nIs On Floor: ${data.onFloor}\nVelocity: { x: ${data.velocity.x}, y: ${Math.floor(data.velocity.y)}}`

                this.debugText.setText(text);
            }
        });
    }
}