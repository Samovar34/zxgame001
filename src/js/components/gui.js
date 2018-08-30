/**
 * Game GUI component
 * @param {Phaser.Game} game
 * @this {Phaser.Sprite}
 * @constructor
 */
AdslJumper.GUI = function (game) {

    // extend
    Phaser.Sprite.call(this, game, 0, 0);

    this.game = game;
    this.fixedToCamera = true;

    this.bg = this.addChild(this.game.make.sprite(0, 0, "atlas_2", "guiBg1.png"));
    this.bg.smoothed = false;
    this.bg.scale.setTo(226, _scaleFactor);
    this.bg.alpha = 0.8;

    this.bg.animations.add("default", [
        "guiBg1.png",
        "guiBg2.png",
        "guiBg3.png",
        "guiBg4.png",
        "guiBg5.png",
        "guiBg4.png",
        "guiBg3.png",
        "guiBg2.png",
        "guiBg1.png"
    ], 16);

    this.scoreOffsetX = 72;

    this.offsetYIcon = 2 * _scaleFactor;
    this.offsetYNumbers = 3 * _scaleFactor;

    // room & bitcoins
    this.roomText = this.addChild(this.game.make.sprite(4 * _scaleFactor, this.offsetYIcon, "atlas_2", "guiIcons1.png"));
    this.scoreText = this.addChild(this.game.make.sprite(56 * _scaleFactor, this.offsetYIcon, "atlas_2", "guiIcons2.png"));

    this.roomText.smoothed = false;
    this.roomText.scale.setTo(_scaleFactor);
    this.scoreText.smoothed = false;
    this.scoreText.scale.setTo(_scaleFactor);


    // № room
    this.roomNumber0 = this.addChild(this.game.make.sprite(20 * _scaleFactor, this.offsetYNumbers, "atlas_2", "numbers1.png"));
    this.roomNumber1 = this.addChild(this.game.make.sprite((20 + 10) * _scaleFactor, this.offsetYNumbers, "atlas_2", "numbers1.png"));

    this.roomNumber0.smoothed = false;
    this.roomNumber0.scale.setTo(_scaleFactor);
    this.roomNumber1.smoothed = false;
    this.roomNumber1.scale.setTo(_scaleFactor);


    this.scoreNumber0 = this.addChild(this.game.make.sprite(this.scoreOffsetX * _scaleFactor, this.offsetYNumbers, "atlas_2", "numbers1.png"));
    this.scoreNumber1 = this.addChild(this.game.make.sprite((this.scoreOffsetX + 10) * _scaleFactor, this.offsetYNumbers, "atlas_2", "numbers1.png"));
    this.scoreNumber2 = this.addChild(this.game.make.sprite((this.scoreOffsetX + 10 * 2) * _scaleFactor, this.offsetYNumbers, "atlas_2", "numbers1.png"));

    this.scoreNumber0.smoothed = false;
    this.scoreNumber0.scale.setTo(_scaleFactor);
    this.scoreNumber1.smoothed = false;
    this.scoreNumber1.scale.setTo(_scaleFactor);
    this.scoreNumber2.smoothed = false;
    this.scoreNumber2.scale.setTo(_scaleFactor);

    //add to game
    this.game.add.existing(this);
   
};

AdslJumper.GUI.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.GUI.prototype.constructor = AdslJumper.GUI;

/**
 * set room
 * @param {String | Number} room
 */
AdslJumper.GUI.prototype.setRoom = function (room) {
    room += "";
    this.roomNumber0.frameName = "numbers" + (parseInt(room[0]) + 1) + ".png";
    this.roomNumber1.frameName = "numbers" + (parseInt(room[1]) + 1) + ".png";
};

/**
 * set score
 * @param {String | Number} score
 */
AdslJumper.GUI.prototype.setScore = function (score) {
    score += "";
    score = this.zero[score.length + ""] + score;
    this.scoreNumber0.frameName = "numbers" + (parseInt(score[0]) + 1) + ".png";
    this.scoreNumber1.frameName = "numbers" + (parseInt(score[1]) + 1) + ".png";
    this.scoreNumber2.frameName = "numbers" + (parseInt(score[2]) + 1) + ".png";
};

AdslJumper.GUI.prototype.zero = {
    "1" : "00",
    "2" : "0",
    "3" : ""
};

AdslJumper.GUI.prototype.flash = function () {
    this.bg.animations.play("default");
};

