// Led class
// extends Phaser.Sprite class
// only for goup
AdslJumper.Led = function (game, x, y, color) {

    // extend
    Phaser.Sprite.call(this, game, x, y, "atlas_2", "led2.png");

    this.game = game;

    this.tag = "led";
    this.name = "led";

    this.smoothed = false;
    this.scale.setTo(_scaleFactor);

    this.color =  color || "yellow";

    switch(this.color) {
        case "yellow":
            this.startFrame = 1;
            break;
        case "green":
            this.startFrame = 3;
            break;
        case "red":
            this.startFrame = 4;
            break;
        default:
            this.startFrame = 2;
            break;
    }

    this.setRandomAnimation();

};

AdslJumper.Led.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.Led.prototype.constructor = AdslJumper.Led;

// void
AdslJumper.Led.prototype.setRandomAnimation = function () {
    var temp = Math.round(Math.random() * 10)/ 10;
    var frameRate = this.getRandomFrameRate();

    if (temp < 0.3) {
        this.animations.add("default", [
            "led" + this.startFrame + ".png", 
            "led2.png"
        ], frameRate, true);
    } else if (temp > 0.3 && temp < 0.6) {
        this.animations.add("default", [
            "led" + this.startFrame + ".png",
            "led2.png",
            "led2.png",
            "led" + this.startFrame + ".png",
            "led2.png"
        ], frameRate, true);
    } else if (temp > 0.6 && temp < 0.8) {
        this.animations.add("default", [
            "led2.png", 
            "led" + this.startFrame + ".png",
            "led" + this.startFrame + ".png",
            "led2.png",
            "led2.png"
        ], frameRate, true);
    } else {
        this.animations.add("default", [
            "led" + this.startFrame + ".png",
            "led" + this.startFrame + ".png",
            "led2.png", 
            "led" + this.startFrame + ".png",
            "led2.png",
            "led2.png",
            "led2.png"
        ], frameRate, true);
    }
};

AdslJumper.Led.prototype.getRandomFrameRate = function () {
    return Math.round(Math.random() * 36);
};
