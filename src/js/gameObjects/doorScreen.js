/**
 * Door Screen game object class
 * Create and add image to fx group
 * @param {Phaser.State} state
 * @param {number} x
 * @param {number} y
 * @constructor
 */
AdslJumper.DoorScreen = function (state, x, y) {
    if (_lang === "ru") {
        this.sprite = state.fx.add(
            state.make.image(x * _scaleFactor, y * _scaleFactor, "atlas_2", "screenDoor2.png")
        );
    } else {
        this.sprite = state.fx.add(
            state.make.image(x * _scaleFactor, y * _scaleFactor, "atlas_2", "screenDoor1.png")
        );
    }

    this.sprite.smoothed = false;
    this.sprite.scale.setTo(_scaleFactor);
};

AdslJumper.DoorScreen.prototype.open = function () {
    if (_lang === "ru") {
        this.sprite.frameName = "screenDoor4.png";
    } else {
        this.sprite.frameName = "screenDoor3.png";
    }
};
