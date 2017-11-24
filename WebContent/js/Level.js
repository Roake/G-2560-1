/**
 * Level state.
 */
function Level() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Level.prototype = proto;


Level.prototype.create = function() {
	background = this.add.tileSprite(0, 0, 1024, 768, "BG");
	background.scale.set(1);
	background.fixedToCamera = true;
	this.map = this.game.add.tilemap("lab7");
	this.map.addTilesetImage('TS1');
	this.map.addTilesetImage('TS2');
	this.maplayer = this.map.createLayer("Tile Layer 1");
	this.maplayer1 = this.map.createLayer("Tile Layer 2");
	this.maplayer.resizeWorld();
	this.map.setCollisionBetween(0,1000,true,this.maplayer);
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.physics.arcade.gravity.y = 1000;


	this.enemies = this.add.group();
	for (x  in this.map.objects.object) {
	var obj = this.map.objects.object[x];
	if (obj.type == "player") {
			console.log(this.player);
			this.player = this.addPlayer(obj.x, obj.y);
			this.game.camera.follow(this.player,Phaser.Camera.FOLLOW_PLATFORMER);
		}
		if (obj.type == "minister") {
			var d = this.addMinister(obj.x, obj.y);
			this.enemies.add(d);
		}
		}
	var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
	text.scale.set(1);
	
	this.createWeapon();
	this.player.events.onInputDown.add(this.fireWeapon, this);
};

Level.prototype.createWeapon = function() {
	this.weapon1 = this.add.weapon(10,"bullet",1);
	this.weapon1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon1.trackSprite(this.player,0,0);
	this.weapon1.bulletSpeed = 2000;
	this.weapon1.fireAngle = 0;
	this.weapon1.rate = 1;
	
	}

Level.prototype.update = function() {
	this.game.physics.arcade.collide(this.player,this.maplayer);
	this.game.physics.arcade.collide(this.enemies,this.maplayer);
	/*if (input.keyboard.isDown) {
		var dx = (pointer.worldX - this.player.x) * 2;
		if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			if (dx > 0){
				dx = 0.4;}
			else{
				dx = -0.4;}
			this.player.scale.x = dx;
			this.player.body.velocity.x = 250 * dx;
			}
	}	*/
		
		 if(this.input.keyboard.isDown(Phaser.Keyboard.UP)){
				if(this.player.body.velocity.y==0){
					this.player.body.velocity.y=-350;
					this.player.play("jump");
					if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
				this.player.play("ffb");}} 
		 }else if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			this.player.body.velocity.x = -120;
			this.player.scale.x = -0.3;
			this.player.play("walk");
		}else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			this.player.body.velocity.x = 120;
			this.player.scale.x = 0.3;
			this.player.play("walk");
		}
	else if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			this.player.play("attack");
		}else {
			this.player.body.velocity.x = 0;
			this.player.play("idle");
		}
};

Level.prototype.addPlayer = function(x, y) {
	var t = this.add.sprite(x, y, "Winston");
	t.animations.add("idle", gframes("Winston-True-Idle", 2),2, true);
	t.animations.add("walk", gframes("Winston-Walk", 5), 5, true);
	t.animations.add("jump", gframes("Winston-Jump", 5), 5, true);
	t.animations.add("attack", gframes("Winston-Fire", 5), 10, true);
	t.animations.add("ffb", gframes("Winston-Fire-From-Above", 5), 20, true);
	t.anchor.set(0.5, 0.5);
	t.scale.set (0.3);
	t.smoothed = false;
	this.game.physics.arcade.enable(t);
	t.play("idle");
	t.body.collideWorldBounds = true;
	return t;
};
Level.prototype.fireWeapon = function (){
	
//	if(this.weapon1.fire()!=false){
//		this.shot.play();
//	}
 this.weapon1.fire();
	
	
}
Level.prototype.addMinister = function(x, y) {
	var a = this.add.sprite(x, y, "Celt");
	a.animations.add("idle", gframes("Celt-Idle", 1), 1, true,false);
	a.anchor.set(0.5, 1);
	a.scale.set (0.5);
	a.smoothed = false;
	this.game.physics.arcade.enable(a);
	a.play("idle");
	a.body.collideWorldBounds = true;
	return a;
};

function gframes(key, n) {
	f = [];
	for (var i = 0; i <= n; i++) {
		f.push(key + "_" + "00" + i);
	}
	return f;
};

