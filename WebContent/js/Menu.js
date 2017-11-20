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
		this.Start= this.Start (277,370);
		this.Set= this.Set (160,450);
		this.Dev= this.Dev (235,530);
		var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
		text.scale.set(1);
	};
	Menu.prototype.Start = function(x,y) {
		R= this.add.sprite(x,y,"Start-Icon");
		R.anchor.set(0.5, 0.5);
		return R;
	}
	Menu.prototype.Set = function(x,y) {
		R= this.add.sprite(x,y,"Setting-Icon");
		R.anchor.set(0.5, 0.5);
		return R;
	}
	
	Menu.prototype.Dev = function(x,y) {
		R= this.add.sprite(x,y,"Dev-Icon", actionOnClick, this, 2, 1, 0);
		R.anchor.set(0.5, 0.5);
		
		return R;
	}
	Menu.prototype.Dev = function actionOnClick () {
		this.game.state.start("Dev");
	}
Menu.prototype.startGame = function() {
	this.game.state.start("Level");
};