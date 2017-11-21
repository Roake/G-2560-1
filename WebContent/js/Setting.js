/**
 * Setting state.
 */
function Setting() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Setting.prototype = proto;
/**
 *
 */
function Setting () {
	Phaser.State.call(this);
}

Setting.prototype.create = function (){
	var text = this.add.text(this.world.centerX-100, this.world.centerY, "Not Available in Alpha Version", {fill: 'white'});
	text.scale.set(1);
	this.input.onDown.add(this.startGame,this);
	
}

Setting.prototype.startGame = function (){
	this.game.state.start("Menu");
	
	
}

