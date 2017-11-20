/**
 * Dev state.
 */
function Dev() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Dev.prototype = proto;
/**
 *
 */

Dev.prototype.create = function() {
	var sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"DevPage");
sprite.anchor.set(0.5, 0.5);
this.input.onDown.add(this.startGame, this);
var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
text.scale.set(1);
}

Dev.prototype.startGame = function() {
	this.game.state.start("Menu");
};
