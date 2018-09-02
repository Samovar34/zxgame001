AdslJumper.level5 = new AdslJumper.State(Game, 480, 272, true, true);

AdslJumper.level5.doAfterCreate = function () {
    if (_lang === "ru") {
        this.tutImage1 = this.add.image(112 * _scaleFactor, 192 * _scaleFactor, "atlas_2", "wallsliding_ru.png");
        this.tutImage1.smoothed = false;
        this.tutImage1.scale.setTo(_scaleFactor);

        this.tutImage2 = this.add.image(112 * _scaleFactor, 128 * _scaleFactor, "atlas_2", "pressJump_ru.png");
        this.tutImage2.smoothed = false;
        this.tutImage2.scale.setTo(_scaleFactor);
    }
};