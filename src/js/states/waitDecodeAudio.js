AdslJumper.waitDecodeAudio = function (game) {};

AdslJumper.waitDecodeAudio.prototype = {

    create: function () {
        this.game.add.image(268, 148, "waitingAudio");
        if (AdslJumper.data.prev === "preload") {
            this.beforeStory();
            return;
        }

        if (AdslJumper.data.prev === "menu") {
            this.beforePlay();
            return;
        }

        
    }
};

// before story
AdslJumper.waitDecodeAudio.prototype.beforeStory = function () {
    console.log("wait decode story");
    // add track
    AdslJumper.modules.soundManager.currentTrack = this.game.add.sound("intro");
    this.game.sound.decode("intro");


    // after decode start story
    this.game.sound.setDecodedCallback([AdslJumper.modules.soundManager.currentTrack], function () {

        AdslJumper.data.prev = "waitDecodeAudio";
        AdslJumper.data.next = "story";

        this.state.start("story");
    }, this);
 
};

AdslJumper.waitDecodeAudio.prototype.beforePlay = function () {
    console.log("wait decode play");

    if (AdslJumper.data.level >= 0 && AdslJumper.data.level <= 15) {
        // add track
        AdslJumper.modules.soundManager.tempTrack = this.game.add.sound("track01");
        this.game.sound.decode("track01");
    }

    // after decode start story
    this.game.sound.setDecodedCallback([AdslJumper.modules.soundManager.tempTrack], function () {

        AdslJumper.data.prev = "waitDecodeAudio";
        AdslJumper.data.next = "play";

        this.state.start("play");
    }, this);
 
};