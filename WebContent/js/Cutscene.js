/**
 *Cutscene state.
 */
function Cutscene() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Cutscene.prototype = proto;


Cutscene.prototype.create = function() {
		var p1 = this.add.sprite(this.world.centerX, this.world.centerY,
	"PG1");
p1.anchor.set(0.5, 0.5);
this.input.onDown.add(this.PG2, this);
var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
text.scale.set(1);
}

Cutscene.prototype.PG2 = function() {
	var p2 = this.add.sprite(this.world.centerX, this.world.centerY,
	"PG2");
p2.anchor.set(0.5, 0.5);
this.input.onDown.add(this.PG3, this);
var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
text.scale.set(1);
};

Cutscene.prototype.PG3 = function() {
	var p3 = this.add.sprite(this.world.centerX, this.world.centerY,
	"PG3");
p3.anchor.set(0.5, 0.5);
this.input.onDown.add(this.PG4, this);
var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
text.scale.set(1);
};

Cutscene.prototype.PG4 = function() {
	var p4 = this.add.sprite(this.world.centerX, this.world.centerY,
	"PG4");
p4.anchor.set(0.5, 0.5);
this.input.onDown.add(this.PG5, this);
var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
text.scale.set(1);
};

Cutscene.prototype.PG5 = function() {
	var p5 = this.add.sprite(this.world.centerX, this.world.centerY,
	"PG5");
p5.anchor.set(0.5, 0.5);
this.input.onDown.add(this.startGame, this);
var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
text.scale.set(1);
};

Cutscene.prototype.startGame = function() {
	this.game.state.start("Pick");
};

