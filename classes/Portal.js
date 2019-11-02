import Phaser from "phaser";

export default class Portal extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "Portal");
    this.scene = scene;

    // Add to rendering engine
    scene.add.existing(this);
    // Add to physics engine
    scene.physics.add.existing(this, false);
    this.setCollideWorldBounds(true);
    this.setDrag(0, 0).setBounce(0, 0);
    this.setMaxVelocity(0, 350);
    this.setVelocity(0, 0);
  }

  update() {}

  destroy() {
    super.destroy();
  }
}
