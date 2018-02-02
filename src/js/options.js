var gameOptions = {
    gameWidth: 1280, //320 = src; 640 => work dim => 320 x scaleFactor
    gameHeight: 720, //360
    scaleFactor: 1,
    bgColor: 0x000000,
    cameraFadeTime: 600, // ms
    cameraFlashTime: 500, // ms
    isDevelopment: 0,
    isFeatures: 1,
    particleSpeed: 1050,
    paralacsFactor: {x: 0.35, y: 0.35},
    player : {
        gravity: 1700,
        grip: 145,
        speed: 562,
        maxFallSpeed: 920,
        runSpeedUpRate: 1.5,
        acceleration: 6200,
        jump: 680,
        doubleJump: 483,
        drag: 7950,
        // acceleration *= inAirAccelerationRate
        inAirAccelerationRate: 0.8,
        groundDelay: 5, // delay in frames
        wallBreakTime: 15,
        walkAnimationSpeed: 9,
        doubleAnimationSpeed: 12,
        comeInAnimationSpeed: 10,
        deathAnimationSpeed: 48
    }
};