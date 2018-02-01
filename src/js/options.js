var gameOptions = {
    gameWidth: 320, //320 = src; 640 => work dim => 320 x scaleFactor
    gameHeight: 180, //360
    scaleFactor: 2,
    bgColor: 0x000000,
    cameraFadeTime: 800, // ms
    cameraFlashTime: 500, // ms
    isDevelopment: 0,
    isFeatures: 1,
    particleSpeed: 350,
    paralacsFactor: {x: 0.2, y: 0.2},
    player : {
        gravity: 700,
        grip: 125,
        speed: 285,
        maxFallSpeed: 600,
        runSpeedUpRate: 1.5,
        acceleration: 3500,
        jump: 300,
        doubleJump: 240,
        drag: 4050,
        // acceleration *= inAirAccelerationRate
        inAirAccelerationRate: 0.55,
        groundDelay: 5, // delay in frames
        wallBreakTime: 15,
        walkAnimationSpeed: 8,
        doubleAnimationSpeed: 9,
        comeInAnimationSpeed: 10
    }
};