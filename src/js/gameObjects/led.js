// Lef class
// extends Phaser.Sprite class
// only for goup
AdslJumper.Led = function (game, x, y, color) {

    // extend
    Phaser.Sprite.call(this, game, x, y, "led");

    this.game = game;

    this.tag = "led";
    this.name = "led";

    switch(color) {
        case "yellow":
            this.startFrame = 0;
            break;
        case "green":
            this.startFrame = 2;
            break;
        case "red":
            this.startFrame = 3;
            break;
        default:
            this.startFrame = 0;
            break;
    }

    this.setRandomAnimation();
    this.animations.play("default");
};

AdslJumper.Led.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.Led.prototype.constructor = AdslJumper.Led;

// void
AdslJumper.Led.prototype.setRandomAnimation = function () {
    var temp = Math.round(Math.random() * 10)/ 10;
    var frameRate = this.getRandomFrameRate();

    if (temp < 0.3) {
        this.animations.add("default", [this.startFrame, 1], frameRate, true);
    } else if (temp > 0.3 && temp < 0.6) {
        this.animations.add("default", [this.startFrame, 1, 1, this.startFrame, 1], frameRate, true);
    } else if (temp > 0.6 && temp < 0.8) {
        this.animations.add("default", [1, this.startFrame, this.startFrame, 1, 1], frameRate, true);
    } else {
        this.animations.add("default", [this.startFrame, this.startFrame, 1, this.startFrame, 1, 1, 1], frameRate, true);
    }
}

AdslJumper.Led.prototype.getRandomFrameRate = function () {
    return Math.round(Math.random() * 36);
}
