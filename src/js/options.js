var gameOptions = {
    gameWidth: 1280,
    gameHeight: 720,
    bgColor: 0x001155,
    player : {
        gravity: 900,
        grip: 50,
        speed: 400,
        runSpeedUpRate: 1.5,
        acceleration: 8000,
        jump: 450,
        doubleJump: 400,
        drag: 8500,
        // velocity = V * inAirVelocityRate
        inAirVelocityRate: 1,
        groundDelay: 5, // delay in frames
        wallBreakTime: 10
    }
};