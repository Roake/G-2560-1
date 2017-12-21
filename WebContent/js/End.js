/**
 *End state.
 */
function End() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
End.prototype = proto;


End.prototype.create = function() {
	var p1 = this.add.button(this.world.centerX, this.world.centerY,
			"END",this.PG2, this);
		p1.anchor.set(0.5, 0.5);
		var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
		text.scale.set(1);
		this.game.cache.removeSound("sewer 2");
		}
End.prototype.PG2 = function() {
	this.game.state.start("Menu");
};

