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
Dev.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

Dev.prototype.create = function() {
	var sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"DevPage");
sprite.anchor.set(0.5, 0.5);
}

