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
	background = this.add.tileSprite(0, 0, 1400, 600, "BG");
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
};
Level.prototype.update = function() {
	this.game.physics.arcade.collide(this.player,this.maplayer);
	this.game.physics.arcade.collide(this.enemies,this.maplayer);
	var pointer = this.input.activePointer;
	if (pointer.isDown) {
		var dx = (pointer.worldX - this.player.x) * 2;
		if (dx < -20 || dx > 20) {
			if (dx > 0){
				dx = 0.4;}
			else{
				dx = -0.4;}
			this.player.scale.x = dx;
			this.player.body.velocity.x = 250 * dx;
			this.player.play("walk");
		}
	}
		if (pointer.isUp){
			this.player.body.velocity.x = 0;
			this.player.play("idle");
		}
		
		if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			this.player.body.velocity.x = -120;
			this.player.play("walk");
		}else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			this.player.body.velocity.x = 120;
			this.player.play("walk");
		}
		if(this.input.keyboard.isDown(Phaser.Keyboard.UP)){
			if(this.player.body.velocity.y==0)
			
				this.player.body.velocity.y=-550;
				
		}else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
		
		}
};

Level.prototype.addPlayer = function(x, y) {
	var t = this.add.sprite(x, y, "Roake");
	t.animations.add("idle", gframes("Roake-Idle", 2),2, true);
	t.animations.add("walk", gframes("Roake-Walk", 4), 5, true);
	t.anchor.set(0.5, 0.5);
	t.scale.set (0.4);
	t.smoothed = false;
	this.game.physics.arcade.enable(t);
	t.play("idle");
	t.body.collideWorldBounds = true;
	return t;
};
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
}

