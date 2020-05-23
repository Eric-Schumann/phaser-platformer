class Player extends Phaser.Physics.Arcade.Sprite {
    constructor({ scene, x, y }) {
        super(scene, x, y, 'playerIdle');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.body.setSize(this.width * .5, this.height * .7);
        this.body.setOffset(25, 30);

        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.VELOCITY = 300;
        this.JUMP_HEIGHT = -700;
        this.body.setDragX(this.VELOCITY * 1.5);

        this.addAnimations();
        this.scene.cameras.main.setBounds(0, 0, 6400, 640);
        this.scene.cameras.main.startFollow(this, true, 0.05, 0);
        this.jump = this.scene.sound.add("jump");

        this.scene.registry.set('debugData', {
            x: this.x,
            y: this.y,
            onFloor: true
        });
    }

    update(dt) {

        const onFloor = this.body.onFloor();
        if(this.body.velocity.x !== 0 && onFloor) {
            this.play('run', true);
        } else if(onFloor){
            this.play('idle', true);
        } else {
            this.play('jump', true);
        }

        if(this.cursors.left.isDown) {
            this.setVelocityX(-this.VELOCITY);
            this.flipX = true;
        } else if(this.cursors.right.isDown) {
            this.setVelocityX(this.VELOCITY);
            this.flipX = false ;
        }

        if(this.cursors.space.isDown && onFloor) {
            this.setVelocityY(this.JUMP_HEIGHT);
            this.jump.play();
        }

        this.scene.registry.set('debugData', {
            x: Math.floor(this.x),
            y: Math.floor(this.y),
            onFloor: onFloor,
            velocity: this.body.velocity
        });
    }

    addAnimations() {
        this.scene.anims.create({
            key: 'run',
            frames: [
                { key: 'playerWalk1' },
                { key: 'playerWalk2' }
            ],
            frameRate: 4,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'idle',
            frames: [{ key: 'playerIdle' }],
            frameRate: 0,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'jump',
            frames: [{ key: 'playerJump' }],
            frameRate: 0,
            repeat: 0
        });
    }
}
