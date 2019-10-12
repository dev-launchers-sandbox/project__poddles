import Phaser from "phaser";

import Ball from "./classes/Ball.js";
import Paddle from "./classes/Paddle.js";

class PlayScene extends Phaser.Scene {
  preload() {
    this.load.spritesheet("johnny", "./assets/johnny_sprite.png", {
      frameWidth: 16,
      frameHeight: 16,
      margin: 0,
      spacing: 0
    });
  }

  create() {
    this.johnny = new Ball(this, 100, 100);
    this.johnny.sprite.setCollideWorldBounds(true);

    const camera = this.cameras.main;
    const cursors = this.input.keyboard.createCursorKeys();
    camera.setBounds(0, 0, this.game.config.width, this.game.config.height);

    // Left paddle
    this.leftPaddle = new Paddle(this, 30, this.game.config.height / 2, 20, 80);
    this.physics.add.collider(this.johnny.sprite, this.leftPaddle.sprite);

    // Right paddle
    this.rightPaddle = new Paddle(
      this,
      this.game.config.width - 30,
      this.game.config.height / 2,
      20,
      80
    );
    this.physics.add.collider(this.johnny.sprite, this.rightPaddle.sprite);

    this.add
      .text(0, 0, "Arrow keys to move paddles!", {
        font: "8px monospace",
        fill: "#ffffff",
        padding: { x: 1, y: 1 },
        backgroundColor: "#000000"
      })
      .setScrollFactor(0);
  }

  update(time, delta) {
    this.johnny.update(time, delta);
    this.leftPaddle.update(time, delta);
    this.rightPaddle.update(time, delta);
  }

  /* <Begin> helper functions added by Kris */
  //
  //

  addPhysicalRectangle(x, y, width, height, color, alphaIThinkMaybe) {
    // TODO: alphaIThinkMaybe name change
    let rect = this.add.rectangle(x, y, width, height, color, alphaIThinkMaybe);
    rect = this.physics.add.existing(rect, true);

    return rect;
  }

  /* </End> Helper functions added by kris */
}

const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 300,
  parent: "game-container",
  pixelArt: true,
  zoom: 0.75,
  backgroundColor: "#000000",
  scene: PlayScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  }
};

const game = new Phaser.Game(config);
let controls;
