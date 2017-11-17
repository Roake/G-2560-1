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


function render() {

    game.debug.text("Copyright© F5 Group", 32, 32);

}

Menu.prototype.create = function() {
		this.stage.backgroundColor = "#bb0406";
		var sprite = this.add.sprite(this.world.centerX, this.world.centerY,
				"Title");
		sprite.anchor.set(0.5, 0.5);
		this.input.onDown.add(this.startGame, this);
		this.exit= this.exit (130,100);
	};
	
	Menu.prototype.exit = function(x,y) {
		R= this.add.sprite(x,y,"Exit");
		R.anchor.set(0.5, 0.5);
		return R;
	}
	
Menu.prototype.startGame = function() {
	this.game.state.start("Level");
};