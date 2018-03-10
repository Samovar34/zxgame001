// game parameters
AdslJumper.gameOptions = (function () {

    var gameOptions = {
        gameWidth: 640,
        gameHeight: 360, 
        scaleFactor: 1,
        bgColor: 0x000000,
        cameraFadeTime: 500, // ms
        cameraFlashTime: 400, // ms
        cameraShakeTime: 500,
        isDevelopment: 0,
        isFeatures: 1,
        particleSpeed: 1050,
        paralacsFactor: {x: -0.4, y: -0.5}
    };

    var soundOptions = {
        musicVolume: 0.7,
        sfx: 0.9
    };

    var playerOptions = {
        gravity: 1200,
        grip: 120,
        speed: 272,
        maxFallSpeed: 596,
        runSpeedUpRate: 1.5,
        acceleration: 4200,
        jump: 388,
        doubleJump: 296,
        drag: 5950,
        inAirAccelerationRate: 0.45, // acceleration *= inAirAccelerationRate
        inAirDrag: 0.1,
        groundDelay: 5, // delay in frames
        wallBreakTime: 10,
        walkAnimationSpeed: 9,
        doubleAnimationSpeed: 9,
        comeInAnimationSpeed: 10
    };

    var gameObjectOptions = {
        fartParticlesSpeed  : {minX: -24, maxX: 24, minY: -6, maxY: 32},
        bloodParticlesSpeed : {minX: -1052, maxX: 1052, minY: -1576, maxY: 1576},
        sparksSpeed: {minX: -256, maxX: 256, minY: -256, maxY: 256},
        deathAnimationSpeed : 38
    }

    return {
        getMainOptions: function () {
            return gameOptions;
        },

        getSoundOptions: function () {
            return soundOptions;
        },

        getPlayerOptions: function () {
            return playerOptions;
        },

        getGameObjectOptions: function () {
            return gameObjectOptions;
        }
    }
})();

