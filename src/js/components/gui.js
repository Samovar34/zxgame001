// GUI component
// extends Phaser.Sprite class
AdslJumper.GUI = function (game) {

    // extend
    Phaser.Sprite.call(this, game, 8, 8);

    this.game = game;
    this.fixedToCamera = true;

    this.roomOffsetX = 80;
    this.scoreOffsetX = 296;

    this.roomText = this.addChild(this.game.make.sprite(0, 0, "atlas_2", "guiText4.png"));
    this.scoreText = this.addChild(this.game.make.sprite(240, 0, "atlas_2", "guiText1.png"));

    this.roomNumber0 = this.addChild(this.game.make.sprite(this.roomOffsetX, 0, "atlas_2", "numbers1.png"));
    this.roomNumber1 = this.addChild(this.game.make.sprite(this.roomOffsetX + 12, 0, "atlas_2", "numbers1.png"));

    this.scoreNumber0 = this.addChild(this.game.make.sprite(this.scoreOffsetX, 0, "atlas_2", "numbers1.png"));
    this.scoreNumber1 = this.addChild(this.game.make.sprite(this.scoreOffsetX + 12, 0, "atlas_2", "numbers1.png"));
    this.scoreNumber2 = this.addChild(this.game.make.sprite(this.scoreOffsetX + 12 * 2, 0, "atlas_2", "numbers1.png"));
    this.scoreNumber3 = this.addChild(this.game.make.sprite(this.scoreOffsetX + 12 * 3, 0, "atlas_2", "numbers1.png"));
    this.scoreNumber4 = this.addChild(this.game.make.sprite(this.scoreOffsetX + 12 * 4, 0, "atlas_2", "numbers1.png"));
    this.scoreNumber5 = this.addChild(this.game.make.sprite(this.scoreOffsetX + 12 * 5, 0, "atlas_2", "numbers1.png"));

    //add to game
    this.game.add.existing(this);
   
};

AdslJumper.GUI.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.GUI.prototype.constructor = AdslJumper.GUI;

AdslJumper.GUI.prototype.setRoom = function (room) {
    room = room + "";
    this.roomNumber0.frameName = "numbers" + (parseInt(room[0]) + 1) + ".png";
    this.roomNumber1.frameName = "numbers" + (parseInt(room[1]) + 1) + ".png";
};

AdslJumper.GUI.prototype.setScore = function (score) {
    score += "";
    score = this.zero[score.length + ""] + score;
    this.scoreNumber0.frameName = "numbers" + (parseInt(score[0]) + 1) + ".png";
    this.scoreNumber1.frameName = "numbers" + (parseInt(score[1]) + 1) + ".png";
    this.scoreNumber2.frameName = "numbers" + (parseInt(score[2]) + 1) + ".png";
    this.scoreNumber3.frameName = "numbers" + (parseInt(score[3]) + 1) + ".png";
    this.scoreNumber4.frameName = "numbers" + (parseInt(score[4]) + 1) + ".png";
    this.scoreNumber5.frameName = "numbers" + (parseInt(score[5]) + 1) + ".png";
};

AdslJumper.GUI.prototype.zero = {
    "1" : "00000",
    "2" : "0000",
    "3" : "000",
    "4" : "00",
    "5" : "0",
    "6" : ""
}

