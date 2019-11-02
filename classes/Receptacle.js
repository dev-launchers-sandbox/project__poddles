import Phaser from "phaser";

export default class EnergyBall extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "EnergyBall");
    this.scene = scene;

    // Add to rendering engine
    scene.add.existing(this);
    // Add to physics engine
    scene.physics.add.existing(this);

    this.setDrag(0, 0)
      .setMaxVelocity(400, 400)
      .setBounce(3.2, 1);

    this.setVelocity(999, 999);
  }

  update() {}

  destroy() {
    super.destroy();
  }
}
