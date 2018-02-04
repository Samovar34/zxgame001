// компонент отвечает за все звуки в игре
// вызывать нужно один раз во время инициализации
// BoomBox Class
AdslJumper.BoomBox = function (game) {

    // options
    this.options = AdslJumper.gameOptions.getSoundOptions();
    this.game = game;

    // sounds
    this.jump = this.game.add.audio('jump');
    this.jump.volume = this.options.sfx * 0.75;

    this.doubleJump = this.game.add.audio('doubleJump');
    this.doubleJump.volume = this.options.sfx;

    this.step01 = this.game.add.audio("step01");
    this.step01.volume = this.options.sfx * 0.4;

    this.step02 = this.game.add.audio("step02");
    this.step02.volume = this.options.sfx * 0.4;

    // music
    this.currentTrack = null;
    this.track01 = this.game.add.audio('track01');
};

// TODO подумать нужно ли это
AdslJumper.BoomBox.prototype.constructor = AdslJumper.BoomBox;

// void
AdslJumper.BoomBox.prototype.setMusicVolume = function (value) {

};

// void
AdslJumper.BoomBox.prototype.setSFXVolume = function (value) {

};

// void
AdslJumper.BoomBox.prototype.playMusic = function (track) {

};

// void
AdslJumper.BoomBox.prototype.playStep01 = function () {
    if (!this.step01.isPlaying) {
        this.step01.play();
    }
};

// void
AdslJumper.BoomBox.prototype.playStep02 = function () {
    if (!this.step02.isPlaying) {
        this.step02.play();
    }
};

// void
AdslJumper.BoomBox.prototype.playJump = function () {
    if (!this.jump.isPlaying) {
        this.jump.play();
    }
};

// void
AdslJumper.BoomBox.prototype.playDoubleJump = function () {
    if (!this.doubleJump.isPlaying) {
        this.doubleJump.play();
    }
};

// boolean
AdslJumper.BoomBox.prototype.isMusicPlaying = function () {

};