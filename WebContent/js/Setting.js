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
	var sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"SetPage");
sprite.anchor.set(0.5, 0.5);
	this.input.onDown.add(this.startGame,this);
	var open1 = this.add.button(160,600,"Open",this.Open, this);
	open1.anchor.set(0.5,0.5);
	var open2 = this.add.button(160,450,"Open",this.Open, this);
	open2.anchor.set(0.5,0.5);
	var open3 = this.add.button(160,450,"Open",this.Open, this);
	open3.anchor.set(0.5,0.5);
	var close1 = this.add.button(160,450,"Close",this.Close, this);
	close1.anchor.set(0.5,0.5);
	var close2 = this.add.button(160,450,"Close",this.Close, this);
	close2.anchor.set(0.5,0.5);
	var close3 = this.add.button(160,450,"Close",this.Close, this);
	close3.anchor.set(0.5,0.5);
}
Setting.prototype.Open = function(x,y) {
	this.game.state.start("Menu");
}
Setting.prototype.Close = function(x,y) {
	this.game.state.start("Menu");
}
Setting.prototype.startGame = function (){
	this.game.state.start("Menu");
	
	
}

