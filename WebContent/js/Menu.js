/**
 * Menu state.
 */
function Menu() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Menu.prototype = proto;

Menu.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

Menu.prototype.create = function() {
		this.stage.backgroundColor = "#bb0406";
		var title = this.add.sprite(this.world.centerX-70, this.world.centerY-200,
				"Title");
		title.anchor.set(0.5, 0.5);
		
		
		var start = this.add.button(277,370,"Start-Icon",this.Start, this);
		start.anchor.set(0.5,0.5);
		
		
		var setting = this.add.button(160,450,"Setting-Icon",this.Set, this);
		setting.anchor.set(0.5,0.5);
		
		var dev = this.add.button(235,530,"Dev-Icon",this.Dev, this);
		dev.anchor.set(0.5,0.5);
		//235,530
		var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
		text.scale.set(1);
		
	};
Menu.prototype.Start = function(x,y) {
	this.game.state.start("Pick");
	}

Menu.prototype.Set = function(x,y) {
		this.game.state.start("Setting");
	}
	
Menu.prototype.Dev = function(x,y) {
	this.game.state.start("Dev");
}


Menu.prototype.startGame = function() {
	this.game.state.start("Pick");
};