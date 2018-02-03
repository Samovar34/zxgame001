var gameOptions = {
    gameWidth: 640, //320 = src; 640 => work dim => 320 x scaleFactor
    gameHeight: 360, //360
    scaleFactor: 1,
    bgColor: 0x000000,
    cameraFadeTime: 600, // ms
    cameraFlashTime: 500, // ms
    isDevelopment: 0,
    isFeatures: 1,
    particleSpeed: 1050,
    paralacsFactor: {x: 0.15, y: 0.35},
    sound: {
        musicVolume: 0.8,
        sfx: 0.5
    },
    player: {
        gravity: 1200,
        grip: 105,
        speed: 362,
        maxFallSpeed: 820,
        runSpeedUpRate: 1.5,
        acceleration: 4200,
        jump: 400,
        doubleJump: 283,
        drag: 5950,
        // acceleration *= inAirAccelerationRate
        inAirAccelerationRate: 0.9,
        groundDelay: 5, // delay in frames
        wallBreakTime: 15,
        walkAnimationSpeed: 10,
        doubleAnimationSpeed: 12,
        comeInAnimationSpeed: 10,
        deathAnimationSpeed: 48
    }
};