/**
 *PreBoss state.
 */
function PreBoss() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
PreBoss.prototype = proto;


PreBoss.prototype.create = function() {
	this.cache.removeSound('sewer2');
	background = this.add.tileSprite(0, 0, 1024, 768, "BOSSPBG");
	background.scale.set(1);
	background.fixedToCamera = true;
	
	msgTxt  = this.add.button(this.world.centerX-700, this.world.centerY-200,
	"WIN3-1");
	msgTxt.scale.set(1);
	msgTxt.anchor.set(0.5,0.5);
	this.input.onDown.add(this.SGT2, this);
	}
PreBoss.prototype.SGT2 = function() {
msgTxt.loadTexture("COL3-1",0);
	this.input.onDown.add(this.SGT3, this);
	this.lift = this.add.audio("Boss");
	this.lift.play();

}
PreBoss.prototype.SGT3 = function() {
msgTxt.loadTexture("GEN3-1",0);
	this.input.onDown.add(this.SGT4, this);
	this.lift.stop();
}	
PreBoss.prototype.SGT4 = function() {
msgTxt.loadTexture("COL3-2",0);
	this.input.onDown.add(this.SGT5, this);
}
PreBoss.prototype.SGT5 = function() {
msgTxt.loadTexture("WIN3-2",0);
	this.input.onDown.add(this.WIN2, this);
}
PreBoss.prototype.WIN2 = function() {
msgTxt.loadTexture("GEN3-2",0);
this.input.onDown.add(this.WIN3, this);
}
PreBoss.prototype.WIN3 = function() {
	msgTxt.loadTexture("WIN3-3",0);
	this.input.onDown.add(this.WIN4, this);
	}
PreBoss.prototype.WIN4 = function() {
msgTxt.loadTexture("WIN3-4",0);
this.input.onDown.add(fade, this);
if(this.input.onDown){
this.time.events.add(Phaser.Timer.SECOND * 3, resetFade, this);
this.time.events.add(Phaser.Timer.SECOND * 3, this.Next, this);}
};

function fade() {
//  You can set your own fade color and duration
	this.game.camera.fade(0x000000, 2000);
}

function resetFade() {
	this.game.camera.resetFX();
}


PreBoss.prototype.Next = function(player,goal){ 
	this.game.state.start("Level6");
}