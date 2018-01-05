var gameOptions = {
    gameWidth: 480, //640
    gameHeight: 270, //360
    bgColor: 0x000000,
    isDevelopment: false,
    isFeatures: true,
    player : {
        gravity: 700,
        grip: 75,
        speed: 185,
        maxFallSpeed: 500,
        runSpeedUpRate: 1.5,
        acceleration: 3500,
        jump: 250,
        doubleJump: 250,
        drag: 3750,
        // acceleration *= inAirAccelerationRate
        inAirAccelerationRate: 0.85,
        groundDelay: 5, // delay in frames
        wallBreakTime: 15
    }
};