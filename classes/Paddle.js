import Phaser from "phaser";

export default class Paddle {
  constructor(scene, x, y, width, height) {
    this.scene = scene;

    // Create physics stuff
    this.sprite = scene.addPhysicalRectangle(x, y, width, height, 0xffffff);

    // Track the arrow keys & OPQA
    const {
      LEFT,
      RIGHT,
      UP,
      DOWN,
      Q,
      O,
      P,
      A
    } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      q: Q,
      o: O,
      p: P,
      a: A
    });

    console.log("MAKING PADDLE");
  }

  update() {
    const keys = this.keys;
    const sprite = this.sprite;

    if (keys.up.isDown) {
      sprite.setPosition(sprite.x, (sprite.y -= 3));
      sprite.body.y = sprite.y - sprite.height / 2;
    }

    if (keys.down.isDown) {
      sprite.setPosition(sprite.x, (sprite.y += 3));
      sprite.body.y = sprite.y - sprite.height / 2;
    }

    /*
    const onGround = sprite.body.blocked.down;
    const acceleration = onGround ? 600 : 200;

    // Apply horizontal acceleration when left/a or right/d are applied
    if (keys.left.isDown || keys.o.isDown) {
      sprite.setAccelerationX(-acceleration);
      sprite.setFlipX(true);
    } else if (keys.right.isDown || keys.p.isDown) {
      sprite.setAccelerationX(acceleration);
      sprite.setFlipX(false);
    } else {
      sprite.setAccelerationX(0);
    }

    // Only allow the player to jump if they are on the ground
    if (onGround && (keys.up.isDown || keys.q.isDown)) {
      sprite.setVelocityY(-5000 * 2);
    }

    // Update the animation/texture based on the state of the player
    if (onGround) {
      if (sprite.body.velocity.x !== 0) {
        sprite.anims.play("johnny-walk", true);
      } else {
        sprite.anims.play("johnny-idle", true);
      }
    } else {
      sprite.anims.stop();
      sprite.setTexture("johnny", 4);
    }
    */
  }

  destroy() {
    this.sprite.destroy();
  }
}
