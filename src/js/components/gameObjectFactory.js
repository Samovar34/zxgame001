// creates game objects
AdslJumper.GameObjectFactory = function (game) {
    this.game = game;
    this.options = AdslJumper.gameOptions.getGameObjectOptions();
};

AdslJumper.GameObjectFactory.prototype.createFartParticles = function () {
    // particles
    var gameObject = this.game.add.emitter(0, 0, 10);
    gameObject.makeParticles("atlas_2", ["sparks2.png", "sparks3.png"]);
    gameObject.setYSpeed(this.options.fartParticlesSpeed.minY, this.options.fartParticlesSpeed.maxY);
    gameObject.setXSpeed(this.options.fartParticlesSpeed.minX, this.options.fartParticlesSpeed.maxX);
    gameObject.minRotation = 0;
    gameObject.maxRotation = 0;
    gameObject.alpha = 0.4;

    return gameObject;
};

AdslJumper.GameObjectFactory.prototype.createBackGround01 = function () {

    var gameObject = this.game.add.sprite()
    gameObject.width = 640;
    gameObject.height = 360;
    gameObject.fixedToCamera = true;


    gameObject._filter = new Phaser.Filter(game, null, game.cache.getShader('testShader'));
    gameObject._filter.setResolution(640, 360);

    gameObject.filters = [gameObject._filter];

    return gameObject;
};

AdslJumper.GameObjectFactory.prototype.createMeatBlowSprite = function(x, y) {
    var gameObject = this.game.add.sprite(x, y, "atlas_2", "player16.png");
    gameObject.anchor.setTo(0.5);
    gameObject.animations.add("default", [
        "player16.png",
        "player17.png",
        "player18.png",
        "player19.png",
        "player20.png",
        "player21.png"
    ], this.options.deathAnimationSpeed);
    gameObject.animations.getAnimation("default").killOnComplete = true;
    return gameObject;
};

AdslJumper.GameObjectFactory.prototype.createExplosionSprite = function () {
    var gameObject = this.game.add.sprite(0, 0, "atlas_2", "blow1.png");
    gameObject.animations.add("default", [
        "blow1.png",
        "blow2.png",
        "blow3.png",
        "blow4.png",
        "blow5.png",
        "blow6.png",
        "blow7.png",
        "blow8.png",
        "blow9.png",
        "blow10.png",
        "blow11.png",
        "blow12.png",
        "blow13.png",
        "blow14.png"
    ], 24, true);

    return gameObject;
}

AdslJumper.GameObjectFactory.prototype.createBloodParticles = function () {
    var gameObject = this.game.add.emitter(0, 0, 128);
    gameObject.makeParticles("atlas_2", ['blood1.png', 'blood2.png']);
    gameObject.minRotation = 0;
    gameObject.maxRotation = 0;
    gameObject.setYSpeed(this.options.bloodParticlesSpeed.minY, this.options.bloodParticlesSpeed.maxY);
    gameObject.setXSpeed(this.options.bloodParticlesSpeed.minX, this.options.bloodParticlesSpeed.maxX);
    gameObject.gravity = 900;

    return gameObject;
};

AdslJumper.GameObjectFactory.prototype.createSparks = function () {
    var gameObject = this.game.add.emitter(0, 0, 24);
    gameObject.makeParticles("atlas_2", ["sparks2.png", "sparks3.png"]);
    gameObject.minRotation = 0;
    gameObject.maxRotation = 0;
    gameObject.setYSpeed(this.options.sparksSpeed.minY, this.options.sparksSpeed.maxY);
    gameObject.setXSpeed(this.options.sparksSpeed.minX, this.options.sparksSpeed.maxX);
    gameObject.alpha = 1;
    gameObject.gravity = 0;

    return gameObject;
};

AdslJumper.GameObjectFactory.prototype.createExitLabel = function (x, y) {
    var gameObject = this.game.add.sprite(x, y, "atlas_2", "doorExitLabel1.png");
    gameObject.animations.add("default", [
        "doorExitLabel2.png",
        "doorExitLabel3.png",
        "doorExitLabel4.png",
        "doorExitLabel5.png",
        "doorExitLabel6.png",
        "doorExitLabel7.png",
        "doorExitLabel8.png",
        "doorExitLabel9.png",
        "doorExitLabel10.png",
        "doorExitLabel11.png",
        "doorExitLabel12.png",
        "doorExitLabel13.png",
        "doorExitLabel14.png"
    ], 16, true);

    return gameObject;
};