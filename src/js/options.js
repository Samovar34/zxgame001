// game parameters
AdslJumper.gameOptions = (function () {

    var gameOptions = {
        gameWidth: 640,
        gameHeight: 360, 
        scaleFactor: 1,
        bgColor: 0x000000,
        cameraFadeTime: 600, // ms
        cameraFlashTime: 500, // ms
        isDevelopment: 0,
        isFeatures: 1,
        particleSpeed: 1050,
        paralacsFactor: {x: -0.15, y: -0.35}
    };

    var soundOptions = {
        musicVolume: 0.8,
        sfx: 0.5
    };

    var playerOptions = {
        gravity: 1200,
        grip: 120,
        speed: 362,
        maxFallSpeed: 820,
        runSpeedUpRate: 1.5,
        acceleration: 4200,
        jump: 400,
        doubleJump: 288,
        drag: 5950,
        inAirAccelerationRate: 0.9, // acceleration *= inAirAccelerationRate
        inAirDrag: 0.5,
        groundDelay: 5, // delay in frames
        wallBreakTime: 15,
        walkAnimationSpeed: 10,
        doubleAnimationSpeed: 12,
        comeInAnimationSpeed: 10
    };

    var gameObjectOptions = {
        fartParticlesSpeed  : {minX: -42, maxX: 42, minY: -6, maxY: 52},
        bloodParticlesSpeed : {minX: -1052, maxX: 1052, minY: -1576, maxY: 106},
        sparksSpeed: {minX: -1052, maxX: 1052, minY: -1052, maxY: 1052},
        deathAnimationSpeed : 48
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

