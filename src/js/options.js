var gameOptions = {
    gameWidth: 320, //640
    gameHeight: 180, //360
    bgColor: 0x000000,
    cameraFadeTime: 800, // ms
    cameraFlashTime: 500, // ms
    isDevelopment: 0,
    isFeatures: 1,
    player : {
        gravity: 700,
        grip: 75,
        speed: 185.5,
        maxFallSpeed: 500,
        runSpeedUpRate: 1.5,
        acceleration: 2500,
        jump: 250,
        doubleJump: 250,
        drag: 3050,
        // acceleration *= inAirAccelerationRate
        inAirAccelerationRate: 0.55,
        groundDelay: 5, // delay in frames
        wallBreakTime: 15,
        walkAnimationSpeed: 8,
        doubleAnimationSpeed: 6,
        comeInAnimationSpeed: 8
    }
};