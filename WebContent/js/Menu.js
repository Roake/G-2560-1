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
	var sprite = this.add.sprite(this.world.centerX, this.world.centerY,
			"Title");
	sprite.anchor.set(0.5, 0.5);
	this.input.onDown.add(this.startGame, this);
};

Menu.prototype.startGame = function() {
	this.game.state.start("Level");
};