AdslJumper.waitDecodeAudio = function (game) {};

AdslJumper.waitDecodeAudio.prototype = {

    preload: function () {
        this.game.add.image(268, 148, "waitingAudio");

        // Play game states
        if ((AdslJumper.data.actionCode === AdslJumper.actionCode.FROMMENUTOPLAY) ||
            (AdslJumper.data.actionCode === AdslJumper.actionCode.FROMPLAYTOAUDIO)) {

            // load music
            if (AdslJumper.data.level === "tutor" || AdslJumper.data.level === "level1") {
                this.load.audio('track01', ['assets/audio/music/track01.ogg', 'assets/audio/music/track01.mp3'], false);
            }
        }

    },

    create: function () {

        switch (AdslJumper.data.actionCode) {
            case AdslJumper.actionCode.FROMPRELOADTOSTORY :
                this.beforeStory();
                break;
            case AdslJumper.actionCode.FROMMENUTOPLAY :
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


    // after decode start story
    this.game.sound.setDecodedCallback([AdslJumper.modules.soundManager.currentTrack], function () {

        AdslJumper.data.actionCode = AdslJumper.actionCode.FROMAUDIOTOSTORY;

        AdslJumper.data.level = "story";

        this.state.start("story");
    }, this);
 
};

AdslJumper.waitDecodeAudio.prototype.beforePlay = function () {

    if (AdslJumper.data.level === "tutor" || AdslJumper.data.level === "level1") {
        // add track
        AdslJumper.modules.soundManager.tempTrack = this.game.add.sound("track01");
        this.game.sound.decode("track01");
    }

    // after decode start story
    this.game.sound.setDecodedCallback([AdslJumper.modules.soundManager.tempTrack], function () {

        AdslJumper.data.actionCode = AdslJumper.actionCode.FROMAUDIOTOPLAY;

        this.state.start("tutor");
    }, this);
 
};