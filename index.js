import Phaser from "phaser";

import EnergyBall from "./classes/EnergyBall.js";
import PaddleBody from "./classes/PaddleBody.js";
import Portal from "./classes/Portal.js";
import Receptacle from "./classes/Receptacle.js";

class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  // Load assets to the game
  preload() {
    this.load.spritesheet("EnergyBall", "./assets/EnergyBall.png", {
      frameWidth: 66,
      frameHeight: 65,
      margin: 0,
      spacing: 0
    });

    this.load.spritesheet("Portal", "./assets/Portal.png", {
      frameWidth: 7,
      frameHeight: 78,
      margin: 0,
      spacing: 0
    });

    this.load.spritesheet("PaddleBody", "./assets/PaddleBody.png", {
      frameWidth: 24,
      frameHeight: 131,
      margin: 0,
      spacing: 0
    });
    this.load.image("background", "assets/poddles background.png");
    this.load.image("receptacle", "assets/recepticle.png");

    //this.load.audio('introMusic', "./assests/Hypnotic-Puzzle3.mp3");
  }

  // Create objects
  create() {
    const camera = this.cameras.main;
    const cursors = this.input.keyboard.createCursorKeys();
    camera.setBounds(0, 0, this.game.config.width, this.game.config.height);

    this.background = this.add.image(250, 150, "background");
    this.leftPortal = new Portal(this, 46, 250);
    this.rightPortal = new Portal(this, 457, 250);
    this.receptacle = new Receptacle(this, 150, 250);
    //this.patal=

    this.ball = new EnergyBall(this, 100, 100);
    this.ball.setCollideWorldBounds(true);
    //this.ball2 = new EnergyBall(this, 150, 150);
    //this.ball2.setCollideWorldBounds(true);
    // Left paddle
    this.leftPaddle = new PaddleBody(
      this,
      30,
      this.game.config.height / 2,
      20,
      80
    );
    //this.physics.add.collider(this.ball, this.leftPaddle);

    // Right paddle
    this.rightPaddle = new PaddleBody(
      this,
      this.game.config.width - 30,
      this.game.config.height / 2,
      20,
      80
    );
    //this.physics.add.collider(this.ball, this.rightPaddle);

    this.physics.add.collider([this.leftPaddle, this.rightPaddle], [this.ball]);
    this.physics.add.collider(this.ball);

    this.physics.add.collider(
      this.leftPortal,
      this.ball,
      this.moveBallToRightPortal,
      this.emptyCallback,
      this
    );

    this.physics.add.collider(
      this.rightPortal,
      this.ball,
      this.moveBallToLeftPortal,
      this.emptyCallback,
      this
    );

    /*
    this.add
      .text(0, 0, "Arrow keys to move paddles!", {
        font: "32px monospace",
        fill: "#ffffff",
        padding: { x: 1, y: 1 },
        backgroundColor: "#000000"
      })
      .setScrollFactor(0);
      */
  }

  update(time, delta) {
    this.ball.update(time, delta);
    // this.ball2.update(time, delta);
    this.leftPaddle.update(time, delta);
    this.rightPaddle.update(time, delta);
  }

  moveBallToRightPortal(leftPortal, ball) {
    ball.setCoordinate(this.rightPortal.x, this.rightPortal.y);
  }
  moveBallToLeftPortal(rightPortal, ball) {
    ball.setCoordinate(this.leftPortal.x, this.leftPortal.y);
  }
  emptyCallback(obj1, obj2) {}

  /* <Begin> helper functions added by Kris */
  //
  //

  generateRectangleSprite(width, height) {
    // Returns key of generated sprite object
    let spriteKey = "rectangle-sprite-" + width + "x" + height;

    var graphics = this.add
      .graphics()
      .fillStyle(0xffffff)
      .fillRect(0, 0, width, height)
      .generateTexture(spriteKey, width, height);
    graphics.destroy();

    return spriteKey;
  }
  generateSquareSprite(width) {
    // Returns key of generated sprite object
    return this.generateRectangleSprite(width, width);
  }

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
      gravity: { x: 0, y: 0 }
    }
  }
};

const game = new Phaser.Game(config);
let controls;
