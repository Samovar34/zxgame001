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

        this.textSprite = this.game.add.sprite(256, 330, "atlas_0", "waitAudioDecodeText2.png");
        this.textSprite.smoothed = false;
        this.textSprite.scale.setTo(2);

        this.clockSprite.animations.play("default");


        // load music
        if (AdslJumper.data.level < 10) {
            this.load.audio('track01', ['assets/audio/music/track01.ogg', 'assets/audio/music/track01.mp3'], false);
        }
    },

    create: function () {

        switch (AdslJumper.data.level) {
            case 0 :
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


    if (AdslJumper.data.level < 10) {
        // add track
        AdslJumper.modules.soundManager.tempTrack = this.game.add.sound("track01");
        this.game.sound.decode("track01");
    }

    this.game.sound.setDecodedCallback([AdslJumper.modules.soundManager.tempTrack], this.doOnDecodeTrack, this);
};

AdslJumper.waitDecodeAudio.prototype.doOnDecodeTrack = function () {
    if (AdslJumper.data.level < 10) {
        this.state.start("play");
    } else {

    }
    
};