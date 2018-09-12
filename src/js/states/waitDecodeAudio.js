// декодирование и дозагрузка файлов
AdslJumper.waitDecodeAudio = {

    preload: function () {
        this.clockSprite = this.game.add.sprite(464, 254, "atlas_0", "waitAudioDecodeTime1.png");
        this.clockSprite.smoothed = false;
        this.clockSprite.scale.setTo(_scaleFactor);
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
        this.textSprite = this.game.add.sprite(432, 510, "atlas_0", "waitAudioDecodeText2.png");
        this.textSprite.smoothed = false;
        this.textSprite.scale.setTo(_scaleFactor);

        this.clockSprite.animations.play("default");


        // load music
        if (_level <= 0) {
            this.load.audio('intro', ['assets/audio/music/intro.ogg', 'assets/audio/music/intro.mp3'], false);
        } else if (_level >= 1 && _level <= 6) {
            this.load.audio('track01', ['assets/audio/music/track01.ogg', 'assets/audio/music/track01.mp3'], false);
        } else if (_level >= 7 && _level <= 20) {
            this.load.audio('track02', ['assets/audio/music/track02.ogg', 'assets/audio/music/track02.mp3'], false);
        } else if (_level >= 21 && _level <= 25) {
            this.load.audio('track03', ['assets/audio/music/track03.ogg', 'assets/audio/music/track03.mp3'], false);
        }
    },

    create: function () {

        if (_level <= 0) {
            this.beforeStory();
        } else {
            this.beforePlay();
        }
    }
};

// before story
AdslJumper.waitDecodeAudio.beforeStory = function () {
    // add track
    SoundManager.setTrack(this.game.add.sound("intro"));
    this.game.sound.decode("intro");
    this.textSprite.frameName = "waitAudioDecodeText1.png";

    // after decode start story
    this.game.sound.setDecodedCallback([SoundManager.tempTrack], this.doOnDecodeTrack, this);
 
};

AdslJumper.waitDecodeAudio.beforePlay = function () {
    // stop current music
    SoundManager.resetMusic();

    this.textSprite.frameName = "waitAudioDecodeText1.png";

    if (_level >= 1 && _level <= 6) {
        // add track
        SoundManager.setTrack(this.game.add.sound("track01"));
        this.game.sound.decode("track01");
    } else if (_level >= 7 && _level <= 20) {
        SoundManager.setTrack(this.game.add.sound("track02"));
        this.game.sound.decode("track02");
    }

    this.game.sound.setDecodedCallback([SoundManager.tempTrack], this.doOnDecodeTrack, this);
};

AdslJumper.waitDecodeAudio.doOnDecodeTrack = function () {

    // story or menu state
    if (_level <= 0) {
        this.state.start("story");
        return;
    }


    if (START_TIME === 0) {
        START_TIME = (new Date).getTime();
    }

    this.state.start("level" + _level);
};