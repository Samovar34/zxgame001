var gameOptions = {
    gameWidth: 1280,
    gameHeight: 720,
    bgColor: 0x001155,
    player : {
        gravity: 1000,
        grip: 100,
        speed: 400,
        maxFallSpeed: 600,
        runSpeedUpRate: 1.5,
        acceleration: 7000,
        jump: 490,
        doubleJump: 440,
        drag: 7500,
        // velocity = V * inAirVelocityRate
        inAirAccelerationRate: 1.25,
        groundDelay: 5, // delay in frames
        wallBreakTime: 15
    }
};