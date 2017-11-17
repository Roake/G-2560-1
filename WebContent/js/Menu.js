/**
 * Menu state.
 */
function Menu() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Menu.prototype = proto;

Menu.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};




Menu.prototype.create = function() {
		this.stage.backgroundColor = "#bb0406";
		var sprite = this.add.sprite(this.world.centerX-70, this.world.centerY-200,
				"Title");
		sprite.anchor.set(0.5, 0.5);
		this.input.onDown.add(this.startGame, this);
		this.exit= this.exit (950,700);
		var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
		text.scale.set(1);
	};
	
	Menu.prototype.exit = function(x,y) {
		R= this.add.sprite(x,y,"Exit");
		R.anchor.set(0.5, 0.5);
		return R;
	}
	
Menu.prototype.startGame = function() {
	this.game.state.start("Level");
};