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
		var p1 = this.add.button(this.world.centerX, this.world.centerY,
	"PG1",this.PG2, this);
p1.anchor.set(0.5, 0.5);
var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
text.scale.set(1);
}

Cutscene.prototype.PG2 = function() {
	var p2 = this.add.button(this.world.centerX, this.world.centerY,
	"PG2",this.PG3, this);
p2.anchor.set(0.5, 0.5);
var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
text.scale.set(1);
};

Cutscene.prototype.PG3 = function() {
	var p3 = this.add.button(this.world.centerX, this.world.centerY,
	"PG3",this.PG4, this);
p3.anchor.set(0.5, 0.5);
var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
text.scale.set(1);
};

Cutscene.prototype.PG4 = function() {
	var p4 = this.add.button(this.world.centerX, this.world.centerY,
	"PG4",this.PG5, this);
p4.anchor.set(0.5, 0.5);
var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
text.scale.set(1);
};

Cutscene.prototype.PG5 = function() {
	var p5 = this.add.button(this.world.centerX, this.world.centerY,
	"PG5",this.startGame, this);
p5.anchor.set(0.5, 0.5);
var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
text.scale.set(1);
};

Cutscene.prototype.startGame = function() {
	this.game.state.start("Pick");
};

