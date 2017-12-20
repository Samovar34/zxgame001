var gameOptions = {
    gameWidth: 1280,
    gameHeight: 720,
    bgColor: 0x001155,
    player : {
        gravity: 900,
        grip: 50,
        speed: 550,
        runSpeedUpRate: 1.5,
        acceleration: 8000,
        jump: 500,
        doubleJump: 400,
        drag: 7500,
        // velocity = V * inAirVelocityRate
        inAirVelocityRate: 0.95
    }
};