class Player extends Phaser.Physics.Arcade.Sprite {
    constructor({ scene, x, y }) {
        super(scene, x, y, 'playerIdle');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.scene.physics.world.setBounds(0, 0, 6400, 640, true, true, false, true);
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

        
        //Timer Data
        this.frameCount = 60;
        this.timer = 30;

        this.scene.registry.set('timer', this.timer);

    }

    update(dt) {
        this.handleMovement();
        this.runTimer();
    }

    handleMovement() {
        const onFloor = this.body.onFloor();

        //Control animations based on velocity on floor.
        if(this.body.velocity.x !== 0 && onFloor) {
            this.play('run', true);
        } else if(onFloor){
            this.play('idle', true);
        } else {
            this.play('jump', true);
        }

        //Handle left and right movement.
        if(this.cursors.left.isDown) {
            this.setVelocityX(-this.VELOCITY);
            this.flipX = true;
        } else if(this.cursors.right.isDown) {
            this.setVelocityX(this.VELOCITY);
            this.flipX = false ;
        }

        //Handle jump.
        if(this.cursors.space.isDown && onFloor) {
            this.setVelocityY(this.JUMP_HEIGHT);
            this.jump.play();
        }
    }

    addAnimations() {
        //Run animation.
        this.scene.anims.create({
            key: 'run',
            frames: [
                { key: 'playerWalk1' },
                { key: 'playerWalk2' }
            ],
            frameRate: 4,
            repeat: -1
        });

        //Idle animation.
        this.scene.anims.create({
            key: 'idle',
            frames: [{ key: 'playerIdle' }],
            frameRate: 0,
            repeat: 0
        });

        //Jump animation.
        this.scene.anims.create({
            key: 'jump',
            frames: [{ key: 'playerJump' }],
            frameRate: 0,
            repeat: 0
        });
    }

    runTimer() {
        //Timer based off 60 frames per second.
        this.frameCount -= 1;

        if(this.frameCount === 0) {
            this.frameCount = 60;
            this.timer -= 1;
        }

        //Die when out of time.
        if(this.timer === 0) {
            this.die();
        }

        this.scene.registry.values.timer = this.timer;
    }

    die() {
        this.scene.sound.removeAll();
        this.scene.scene.restart();
    }
}
