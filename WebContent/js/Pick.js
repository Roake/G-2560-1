/**
 * Pick state.
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
this.orange1= this.addWinston(420,600);
this.orange2=this.addStalin(620,420);
}

Pick.prototype.addWinston = function(x, y) {
	var a = this.add.button(x, y, "Winston",this.WinstonPlay, this);
	a.animations.add("Idle", gframes("Winston-Idle", 1), 1, true,false);
	a.anchor.set(0.5, 1);
	a.scale.set (0.45);
	a.smoothed = false;
	this.game.physics.arcade.enable(a);
	a.play("Idle");
	return a;
};
//
Pick.prototype.addStalin = function(x, y) {
	// add monkey
	var b = this.add.button(x, y,
			"Stalin-Idle");
	b.anchor.set(0.5, 0.5);
	b.scale.set(0.4);
	b.animations.add("idle").play(1,true);
	b.smoothed=false;
	return b;
};
//
function gframes(key, n) {
	f = [];
	for (var i = 0; i <= n; i++) {
		f.push(key + "_" + "00" + i);
	}
	return f;
}
Pick.prototype.WinstonPlay = function(x,y) {
	characterPick(1);
	this.game.state.start("Level");
	}

Pick.prototype.startGame = function() {
	this.game.state.start("Level");
};

function characterPick(character) {
	var c=character;
	
}