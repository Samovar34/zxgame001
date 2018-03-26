// декодирование и дозагрузка файлов
AdslJumper.waitDecodeAudio = function (game) {};

AdslJumper.waitDecodeAudio.prototype = {

    preload: function () {
        this.clockSprite = this.game.add.sprite(300, 160, "atlas_0", "waitAudioDecodeTime1.png");
        this.clockSprite.smoothed = false;
        this.clockSprite.scale.setTo(2);
        this.clockSprite.animations.add("default", [
            "waitAudioDecodeTime1.png",
            "waitAudioDecodeTime2.png",
            "waitAudioDecodeTime3.png",
            "waitAudioDecodeTime4.png",
            "waitAudioDecodeTime5.png",
            "waitAudioDecodeTime6.png",
            "waitAudioDecodeTime7.png"
        ], 8, true);
        this.clockSprite.animations.play("default");

        //this.game.add.image(268, 148, "waitingAudio");

        // load music
        if (AdslJumper.data.level === "tutor" || AdslJumper.data.level === "level1") {
            this.load.audio('track01', ['assets/audio/music/track01.ogg', 'assets/audio/music/track01.mp3'], false);
            this.textSprite = this.game.add.sprite(256, 330, "atlas_0", "waitAudioDecodeText2.png");
            this.textSprite.smoothed = false;
            this.textSprite.scale.setTo(2);

            // load asset for levels
            this.game.load.image("level1", "assets/images/levels/level1.png");
            this.game.load.tilemap('map1', 'assets/levels/level1' + ".json", null, Phaser.Tilemap.TILED_JSON);

        }

    },

    create: function () {

        switch (AdslJumper.data.level) {
            case "story" :
                this.beforeStory();
                break;
            default :
                this.beforePlay();
                break;
        }
    }
};

// before story
AdslJumper.waitDecodeAudio.prototype.beforeStory = function () {

    // add track
    AdslJumper.modules.soundManager.currentTrack = this.game.add.sound("intro");
    this.game.sound.decode("intro");

    this.textSprite = this.game.add.sprite(256, 320, "atlas_0", "waitAudioDecodeText1.png");
    this.textSprite.smoothed = false;
    this.textSprite.scale.setTo(2);


    // after decode start story
    this.game.sound.setDecodedCallback([AdslJumper.modules.soundManager.currentTrack], function () {
        this.state.start("story");
    }, this);
 
};

AdslJumper.waitDecodeAudio.prototype.beforePlay = function () {
    this.textSprite.frameName = "waitAudioDecodeText1.png";


    if (AdslJumper.data.level === "tutor" || AdslJumper.data.level === "level1") {
        // add track
        AdslJumper.modules.soundManager.tempTrack = this.game.add.sound("track01");
        this.game.sound.decode("track01");
    }

    // after decode start story
    this.game.sound.setDecodedCallback([AdslJumper.modules.soundManager.tempTrack], function () {
        this.state.start("tutor");
    }, this);
 
};