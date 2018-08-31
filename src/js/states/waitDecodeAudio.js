// декодирование и дозагрузка файлов
AdslJumper.waitDecodeAudio = {

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

        // text load
        this.textSprite = this.game.add.sprite(256, 320, "atlas_0", "waitAudioDecodeText2.png");
        this.textSprite.smoothed = false;
        this.textSprite.scale.setTo(2);

        this.clockSprite.animations.play("default");


        // load music
        if (_level < 10) {
            this.load.audio('track01', ['assets/audio/music/track01.ogg', 'assets/audio/music/track01.mp3'], false);
        }
    },

    create: function () {

        if (_level === 0) {
            this.beforeStory();
        } else {
            this.beforePlay();
        }
    }
};

// before story
AdslJumper.waitDecodeAudio.beforeStory = function () {

    // add track
    SoundManager.currentTrack = this.game.add.sound("intro");
    this.game.sound.decode("intro");

    // text Decode
    this.textSprite = this.game.add.sprite(256, 320, "atlas_0", "waitAudioDecodeText1.png");
    this.textSprite.smoothed = false;
    this.textSprite.scale.setTo(2);


    // after decode start story
    this.game.sound.setDecodedCallback([SoundManager.currentTrack], function () {
        this.state.start("story");
    }, this);
 
};

AdslJumper.waitDecodeAudio.beforePlay = function () {
    this.textSprite.frameName = "waitAudioDecodeText1.png";


    if (_level < 10) {
        // add track
        SoundManager.tempTrack = this.game.add.sound("track01");
        this.game.sound.decode("track01");
    }

    this.game.sound.setDecodedCallback([SoundManager.tempTrack], this.doOnDecodeTrack, this);
};

AdslJumper.waitDecodeAudio.doOnDecodeTrack = function () {
    if (START_TIME === 0) {
        START_TIME = (new Date).getTime();
    }
    if (_level < 10) {
        this.state.start("level" + _level);
    } else {

    }
};