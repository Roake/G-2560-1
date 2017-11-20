/**
 * Dev state.
 */
function Pick() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Pick.prototype = proto;
/**
 *
 */

Dev.prototype.create = function() {
	var sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"PickPage");
sprite.anchor.set(0.5, 0.5);

this.input.onDown.add(this.startGame, this);
}

Dev.prototype.startGame = function() {
	this.game.state.start("Level");
};