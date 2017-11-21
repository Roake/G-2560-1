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

Pick.prototype.create = function() {
	var sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"PickPage");
sprite.anchor.set(0.5, 0.5);
this.orange1= this.addWinston(130,100);
}

Level.prototype.addWinston = function(x, y) {
	var a = this.add.sprite(x, y, "Winston");
	a.animations.add("Idle", gframes("Winston-Idle", 1), 1, true,false);
	a.anchor.set(0.5, 1);
	a.scale.set (0.5);
	a.smoothed = false;
	this.game.physics.arcade.enable(a);
	a.play("Idle");
	a.body.collideWorldBounds = true;
	return a;
};

function gframes(key, n) {
	f = [];
	for (var i = 0; i <= n; i++) {
		f.push(key + "_" + "00" + i);
	}
	return f;
}

Pick.prototype.startGame = function() {
	this.game.state.start("Level");
};