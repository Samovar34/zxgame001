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
    this.bg.scale.setTo(960, _scaleFactor); // 226
    this.bg.alpha = 0.7;

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

    this.scoreOffsetX = 18;
    this.offsetYIcon = 2 * _scaleFactor;
    this.offsetYNumbers = 3 * _scaleFactor;

    // room
    this.scoreText = this.addChild(
        this.game.make.sprite(
            3 * _scaleFactor,
            this.offsetYIcon,
            "atlas_2",
            "guiIcons2.png"
        )
    );

    this.scoreText.smoothed = false;
    this.scoreText.scale.setTo(_scaleFactor);


    // room numbers
    this.roomNumber0 = this.addChild(
        this.game.make.sprite(
            this.game.width/2 - 20,
            this.offsetYNumbers,
            "atlas_2",
            "numbers1.png"
        )
    );
    this.roomNumber0.smoothed = false;
    this.roomNumber0.scale.setTo(_scaleFactor);

    this.roomNumber1 = this.addChild(
        this.game.make.sprite(
            this.game.width/2,
            this.offsetYNumbers,
            "atlas_2",
            "numbers1.png")
    );
    this.roomNumber1.smoothed = false;
    this.roomNumber1.scale.setTo(_scaleFactor);

    // bitcoin numbers
    this.scoreNumber0 = this.addChild(
        this.game.make.sprite(
            this.scoreOffsetX * _scaleFactor,
            this.offsetYNumbers,
            "atlas_2",
            "numbers1.png"
        )
    );
    this.scoreNumber0.smoothed = false;
    this.scoreNumber0.scale.setTo(_scaleFactor);

    this.scoreNumber1 = this.addChild(
        this.game.make.sprite(
            (this.scoreOffsetX + 10) * _scaleFactor,
            this.offsetYNumbers,
            "atlas_2",
            "numbers1.png"
        )
    );
    this.scoreNumber1.smoothed = false;
    this.scoreNumber1.scale.setTo(_scaleFactor);

    this.scoreNumber2 = this.addChild(
        this.game.make.sprite(
            (this.scoreOffsetX + 10 * 2) * _scaleFactor,
            this.offsetYNumbers,
            "atlas_2",
            "numbers1.png"
        )
    );
    this.scoreNumber2.smoothed = false;
    this.scoreNumber2.scale.setTo(_scaleFactor);

    // time
    this.timeNumber0 = this.addChild(
        this.game.make.sprite(
            (this.game.width - 26 - 60),
            this.offsetYNumbers,
            "atlas_2",
            "numbers1.png"
        )
    );
    this.timeNumber0.smoothed = false;
    this.timeNumber0.scale.setTo(_scaleFactor);

    this.timeNumber1 = this.addChild(
        this.game.make.sprite(
            (this.game.width - 26 - 40),
            this.offsetYNumbers,
            "atlas_2",
            "numbers1.png"
        )
    );
    this.timeNumber1.smoothed = false;
    this.timeNumber1.scale.setTo(_scaleFactor);

    this.timeNumber2 = this.addChild(
        this.game.make.sprite(
            (this.game.width - 26 - 20),
            this.offsetYNumbers,
            "atlas_2",
            "numbers1.png"
        )
    );
    this.timeNumber2.smoothed = false;
    this.timeNumber2.scale.setTo(_scaleFactor);

    this.timeNumber3 = this.addChild(
        this.game.make.sprite(
            (this.game.width - 26),
            this.offsetYNumbers,
            "atlas_2",
            "numbers1.png"
        )
    );
    this.timeNumber3.smoothed = false;
    this.timeNumber3.scale.setTo(_scaleFactor);

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
    this.roomNumber0.frameName = "numbers" + room[0] + ".png";
    this.roomNumber1.frameName = "numbers" + room[1] + ".png";
};

/**
 * set score
 * @param {String | Number} score
 */
AdslJumper.GUI.prototype.setScore = function (score) {
    score += "";
    score = this.zeroBitcoin[score.length] + score;
    this.scoreNumber0.frameName = "numbers" + score[0] + ".png";
    this.scoreNumber1.frameName = "numbers" + score[1] + ".png";
    this.scoreNumber2.frameName = "numbers" + score[2] + ".png";
};

AdslJumper.GUI.prototype.zeroBitcoin = [null, "00", "0", ""];
AdslJumper.GUI.prototype.zeroTime = [null, "000", "00", "0", ""]

AdslJumper.GUI.prototype.flash = function () {
    this.bg.animations.play("default");
};

/**
 * update time
 */
AdslJumper.GUI.prototype.updateTime = function (time) {
    time += "";
    time = this.zeroTime[time.length] + time;
    this.timeNumber0.frameName = "numbers" + time[0] + ".png";
    this.timeNumber1.frameName = "numbers" + time[1] + ".png";
    this.timeNumber2.frameName = "numbers" + time[2] + ".png";
    this.timeNumber3.frameName = "numbers" + time[3] + ".png";
};

