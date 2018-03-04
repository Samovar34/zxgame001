// DoorSensor class
// extends Phaser.Sprite class
// only for goup
AdslJumper.DoorSensor = function (game, x, y) {

    // extend
    Phaser.Sprite.call(this, game, x, y, "atlas_2", "doorSensor1.png");

    this.game = game;

    this.tag = "doorSensor";
    this.name = "doorSensor";

    // animation
    this.animations.add("default", [
        "doorSensor10.png", 
        "doorSensor1.png",
    ], 3, true);
};

AdslJumper.DoorSensor.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.DoorSensor.prototype.constructor = AdslJumper.DoorSensor;

