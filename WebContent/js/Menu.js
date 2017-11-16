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
	var sprite = this.add.sprite(this.world.100, this.world.100,
			"Title");
	var sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"Start-Icon");
	var sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"Setting-Icon");
	var sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"Dev-Icon");
	var sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"Exit");
	sprite.anchor.set(0.5, 0.5);
	this.input.onDown.add(this.startGame, this);
};

Menu.prototype.startGame = function() {
	this.game.state.start("Level");
};