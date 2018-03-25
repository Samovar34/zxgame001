AdslJumper.tutorState = function (game) {};

AdslJumper.tutorState.prototype = {
    preload: function () {
        // load the loader bar
        console.log("tutor state");
    },

    create: function () {
        // logic code here

        this.soundManager = AdslJumper.modules.soundManager;

        // music
        if (!this.soundManager.currentTrack) {
            this.soundManager.currentTrack = this.soundManager.tempTrack;
            this.soundManager.tempTrack = null;
            this.soundManager.playTrack();
        };
        
        AdslJumper.data.level = "level1";
        this.game.state.start("level1");
    }
};