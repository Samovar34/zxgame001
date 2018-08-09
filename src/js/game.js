var AdslJumper = {};

// loaded game components, such Input, BoomBox
AdslJumper.modules = {};

//@@include('./include.js')
var game;

window.onload = function () {

	game = new Phaser.Game({
		width: AdslJumper.gameOptions.gameWidth,
		height: AdslJumper.gameOptions.gameHeight,
		renderer: Phaser.AUTO,
		enableDebug: true,
		antialias: false
	});
	game.state.add("boot", AdslJumper.bootState);
	game.state.add("preload", AdslJumper.preloadState);
	game.state.add("story", AdslJumper.storyState);
	game.state.add("menu", AdslJumper.menuState);
	game.state.add("waitDecodeAudio", AdslJumper.waitDecodeAudio);
	game.state.add("play", AdslJumper.playState);
    game.state.add("level1", AdslJumper.level1);
	//game.state.add("tutor2", AdslJumper.tutor2State);
	//game.state.add("lvl", AdslJumper.level1State);

	game.state.start("boot");
};




