window.onload = function() {
	// Create your Phaser game and inject it into an auto-created canvas.
	// We did it in a window.onload event, but you can do it anywhere (requireJS
	// load, anonymous function, jQuery dom ready, - whatever floats your boat)
	var game = new Phaser.Game(1024, 768, Phaser.AUTO);

	// Add the States your game has.
	game.state.add("Boot", Boot);
	game.state.add("Menu", Menu);
	game.state.add("Preload", Preload);
	game.state.add("Level", Level);
	game.state.add("Level2", Level2);
	game.state.add("Level3", Level3);
	game.state.add("Level4", Level4);
	game.state.add("Level5", Level5);
	game.state.add("Level6", Level6);
	game.state.add("PreBoss", PreBoss);
	game.state.add("Cutscene", Cutscene);
	game.state.add("Mid", Mid);
	game.state.add("EndCutscene", EndCutscene);
	game.state.add("Dev", Dev);
	game.state.add("Setting", Setting);
	game.state.add("Pick", Pick);
	
	
	// Now start the Boot state.
	game.state.start("Boot");
};
