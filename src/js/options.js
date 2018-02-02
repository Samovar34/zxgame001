var gameOptions = {
    gameWidth: 640, //320 = src; 640 => work dim => 320 x scaleFactor
    gameHeight: 360, //360
    scaleFactor: 2,
    bgColor: 0x000000,
    cameraFadeTime: 800, // ms
    cameraFlashTime: 500, // ms
    isDevelopment: 0,
    isFeatures: 1,
    particleSpeed: 350,
    paralacsFactor: {x: 0.2, y: 0.2},
    player : {
        gravity: 800,
        grip: 125,
        speed: 292,
        maxFallSpeed: 900,
        runSpeedUpRate: 1.5,
        acceleration: 3700,
        jump: 320,
        doubleJump: 240,
        drag: 4250,
        // acceleration *= inAirAccelerationRate
        inAirAccelerationRate: 0.7,
        groundDelay: 5, // delay in frames
        wallBreakTime: 15,
        walkAnimationSpeed: 9,
        doubleAnimationSpeed: 12,
        comeInAnimationSpeed: 10
    }
};