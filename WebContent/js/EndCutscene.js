/**
 *EndCutscene state.
 */
function EndCutscene() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
EndCutscene.prototype = proto;


EndCutscene.prototype.create = function() {
		var p1 = this.add.sprite(this.world.centerX, this.world.centerY,
	"END1");
p1.anchor.set(0.5, 0.5);
this.input.onDown.add(this.PG2, this);
var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
text.scale.set(1);
}

EndCutscene.prototype.PG2 = function() {
	var p2 = this.add.sprite(this.world.centerX, this.world.centerY,
	"END2");
p2.anchor.set(0.5, 0.5);
this.input.onDown.add(this.PG3, this);
var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
text.scale.set(1);
};

EndCutscene.prototype.PG3 = function() {
	var p3 = this.add.sprite(this.world.centerX, this.world.centerY,
	"END3");
p3.anchor.set(0.5, 0.5);
this.input.onDown.add(this.PG4, this);
var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
text.scale.set(1);
};

EndCutscene.prototype.PG4 = function() {
	var p4 = this.add.sprite(this.world.centerX, this.world.centerY,
	"END4");
p4.anchor.set(0.5, 0.5);
var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
text.scale.set(1);
this.input.onDown.add(fade, this);
this.game.camera.onFadeComplete.add(resetFade, this);
this.time.events.add(Phaser.Timer.SECOND * 4, this.PG5, this);
this.time.events.add(Phaser.Timer.SECOND * 4, this.PG5, this);
};

function fade() {
//  You can set your own fade color and duration
	this.game.camera.fade(0x000000, 2000);
}

function resetFade() {
	this.game.camera.resetFX();

}

EndCutscene.prototype.PG5 = function() {
	var p5 = this.add.sprite(this.world.centerX, this.world.centerY,
	"SELLPAGE");
p5.anchor.set(0.5, 0.5);
this.input.onDown.add(this.startGame, this);
var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
text.scale.set(1);
};


EndCutscene.prototype.startGame = function() {
	this.game.state.start("Menu");
};
