var gameOptions = {
    gameWidth: 640, //640
    gameHeight: 360, //360
    bgColor: 0x000000,
    cameraFadeTime: 800, // ms
    cameraFlashTime: 500, // ms
    isDevelopment: 0,
    isFeatures: 1,
    player : {
        gravity: 800,
        grip: 105,
        speed: 275,
        maxFallSpeed: 500,
        runSpeedUpRate: 1.5,
        acceleration: 3500,
        jump: 350,
        doubleJump: 250,
        drag: 4050,
        // acceleration *= inAirAccelerationRate
        inAirAccelerationRate: 0.55,
        groundDelay: 5, // delay in frames
        wallBreakTime: 15,
        walkAnimationSpeed: 8,
        doubleAnimationSpeed: 6,
        comeInAnimationSpeed: 8
    }
};