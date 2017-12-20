/**
 * Level6 state.
 */
function Level6() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Level6.prototype = proto;


Level6.prototype.create = function() {
	background = this.add.tileSprite(0, 0, 1024, 768, "BG");
	background.scale.set(1);
	background.fixedToCamera = true;
	this.map = this.game.add.tilemap("c2-2");
	this.map.addTilesetImage('industrial.v1');

	this.maplayer = this.map.createLayer("TL1");
	this.maplayer1 = this.map.createLayer("TL2");
	
	

	this.gun = this.add.audio("gun");
	this.gun.allowMultiple=true;
	this.maplayer.resizeWorld();
	this.map.setCollisionBetween(0,1000,true,this.maplayer);
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.physics.arcade.gravity.y = 1000;

//if(this.game.character==1){
	this.bot = this.add.group();
	this.goal=this.add.group();
	this.enemy=this.add.group();
	this.hp=this.add.group();
	for (x  in this.map.objects.object) {
	var obj = this.map.objects.object[x];
	if (obj.type == "player") {
			console.log(this.player);
			this.player = this.addPlayer(obj.x, obj.y);
			this.game.camera.follow(this.player,Phaser.Camera.FOLLOW_PLATFORMER);
		}

		if (obj.type == "bot") {
			var a = this.addSGT(obj.x, obj.y);
			this.bot.add(a);
		}
		if(obj.type == "enemy1"){
			var e = this.addEnemy(obj.x,obj.y);
			this.enemy.add(e);
		}
		if(obj.type == "hp"){
			var h = this.addHp(obj.x,obj.y);
			this.hp.add(h);
		}
		if (obj.type == "enemy2"){
			var e2 = this.addEnemy2(obj.x,obj.y);
			this.enemy.add(e2);
		
		}

		if (obj.type == "goal") {
			// เพิ่ม sprite goal
			var g = this.addGoal(obj.x,obj.y);
			this.goal.add(g);
		}
	
	var text = this.add.text(10, this.world.height-30, "Alpha Version C:2-1", {fill: 'white'});
	text.scale.set(1);
	
	this.createWeapon();
//	this.createText();
	}
//}
};

Level6.prototype.createWeapon = function() {
	this.weapon1 = this.add.weapon(100, "bullet",10);	
	this.weapon2 = this.add.weapon(100, "bullet",10);	
	this.weapon1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon1.trackSprite(this.player, 75, -10);
	this.weapon1.bulletSpeed = 700;
	this.weapon1.fireAngle = 0;
	this.weapon1.rate = 500;
	
	this.weapon1.bulletAngleOffset=90;
	this.weapon1.bulletGravity.y = -1000;
	this.weapon2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon2.trackSprite(this.player, -75,-10);
	this.weapon2.bulletSpeed = 700;
	this.weapon2.fireAngle = 180;
	this.weapon2.bulletAngleOffset=-270;
	this.weapon2.rate = 500;
	this.weapon2.bulletGravity.y = -1000;
	
	}

Level6.prototype.update = function() {
	this.game.physics.arcade.collide(this.player,this.maplayer);
	this.game.physics.arcade.collide(this.enemy,this.maplayer);
	this.game.physics.arcade.collide(this.bot,this.maplayer);
	this.game.physics.arcade.collide(this.goal,this.maplayer);
	this.physics.arcade.collide(this.player,this.goal,this.Next,null,this);
	this.game.physics.arcade.collide(this.hp,this.maplayer);
	this.physics.arcade.collide(this.hp,this.player,this.playerCollideHp,null,this);
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
					this.player.body.velocity.y=-570;
					this.player.play("jump");
					if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
				this.player.play("ffb");}} 
		 }else if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			this.player.body.velocity.x = -200;
			this.player.scale.x = -0.2;
			this.player.play("walk");
	
		}else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			this.player.body.velocity.x = 200;
			this.player.scale.x = 0.2;
			this.player.play("walk");
			
		}
		else if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			if(this.player.scale.x == -0.2){
			this.player.play("attack");
			this.fireWeaponback();}
			if(this.player.scale.x == 0.2){
				this.player.play("attack");
				this.fireWeapon();}
		}else {
			this.player.body.velocity.x = 0;
			this.player.play("idle");
		}
};

Level6.prototype.addHealth = function(hp) {

    //score text
    addHeal = this.add.text(hp.x, hp.y, 'HP+', {
        fill: 'yellow'
    });
    delay = this.add.tween(addHeal);
    delay.to({
        y: hp.y - 20
    }, 500, "Linear", true, 500);
    delay.onComplete.add(function(addHeal) {
        addHeal.kill();
    }, this);
    //kill the +1 on delay play complete
}

//ด้านล่างนี้เดี๋ยวซ่อมเองนะ อย่าลืมล่ะ (บอกตัวเอง)
//Level6.prototype.createText = function (){
//	msgTxt  = this.add.button(this.world.centerX, this.world.centerY,
//	"SGT1-1");
//	msgTxt.scale.set(1);
//	msgTxt.anchor.set(0.5,0.5);
//	this.input.onDown.add(this.WIN1, this);
//	this.time.events.add(10000,function(){this.destroy();},msgTxt);
//	
//	}
//Level6.prototype.WIN1 = function() {
//	msgTxt.loadTexture("WIN1-1",0);
//			this.input.onDown.add(this.SGT2, this);
//		}
//Level6.prototype.SGT2 = function() {
//	msgTxt.loadTexture("SGT1-2",0);
//			this.input.onDown.add(this.SGT3, this);
//		}
//Level6.prototype.SGT3 = function() {
//	msgTxt.loadTexture("SGT1-3",0);
//			this.input.onDown.add(this.SGT4, this);
//		}	
//Level6.prototype.SGT4 = function() {
//	msgTxt.loadTexture("SGT1-4",0);
//			this.input.onDown.add(this.SGT5, this);
//		}
//Level6.prototype.SGT5 = function() {
//	msgTxt.loadTexture("SGT1-5",0);
//			this.input.onDown.add(this.WIN2, this);
//		}
//Level6.prototype.WIN2 = function() {
//	msgTxt.loadTexture("WIN1-2",0);
//	
//		}

Level6.prototype.playerCollideHp = function (player,hp){
	hp.kill();
	this.addHealth(hp);
}

Level6.prototype.addPlayer = function(x, y) {
	
	var t = this.add.sprite(x, y, "Winston");
	t.animations.add("idle", gframes("Winston-True-Idle", 2),2, true);
	t.animations.add("walk", gframes("Winston-Walk", 5), 5, true);
	t.animations.add("jump", gframes("Winston-Jump", 5), 5, true);
	t.animations.add("attack", kframes("Winston-Fire", 5), 10, true);
	t.animations.add("ffb", gframes("Winston-Fire-From-Above", 5), 20, true);
	t.anchor.set(0.5, 0.5);
	t.scale.set (0.2);
	t.smoothed = false;
	this.game.physics.arcade.enable(t);
	t.play("idle");
	t.body.collideWorldBounds = true;
	return t;
	
	
};

Level6.prototype.addEnemy = function(x, y) {
	
	var t = this.add.sprite(x, y, "Wehrmacht");
	t.animations.add("idle", gframes("Wehrmacht-Idle", 2),2, true);
	t.animations.add("walk", gframes("Wehrmacht-Walk", 5), 5, true);
	
	t.animations.add("attack", kframes("Wehrmacht-Attack", 2), 10, true);
	
	t.anchor.set(0.5, 0.5);
	t.scale.set (0.2);
	t.smoothed = false;
	this.game.physics.arcade.enable(t);
	t.play("idle");
	t.body.collideWorldBounds = true;
	return t;
	
	
};
Level6.prototype.addHp = function(x,y){
	var h = this.add.sprite(x,y,"medkit");
	h.anchor.set(0.5,0.25);
	h.scale.set(0.05);
	this.game.physics.arcade.enable(h);
	
	h.body.collideWorldBounds=true;
	return h;
	
}
Level6.prototype.addEnemy2 = function(x, y) {
	
	var t = this.add.sprite(x, y, "Wehrmacht");
	t.animations.add("idle", gframes("Wehrmacht-Idle", 2),2, true);
	t.animations.add("walk", gframes("Wehrmacht-Walk", 5), 5, true);
	
	t.animations.add("attack", kframes("Wehrmacht-Attack", 2), 10, true);
	
	t.anchor.set(0.5, 0.5);
	t.scale.set(0.2);
	t.scale.x=-0.2;
	t.smoothed = false;
	this.game.physics.arcade.enable(t);
	t.play("idle");
	t.body.collideWorldBounds = true;
	return t;
	
	
};

Level6.prototype.fireWeaponback = function (){
	if(this.weapon2.fire()!=false){
		this.gun.play();
	}
	
	this.weapon2.fire();
};
Level6.prototype.fireWeapon = function (){
	if(this.weapon1.fire()!=false){
		this.gun.play();
	}
	this.weapon1.fire();
};

Level6.prototype.addSGT = function(x, y) {
		var a = this.add.sprite(x, y,
	"SGTMcFry");
		a.anchor.set(-1, 0.5);
a.scale.set(0.2);
a.animations.add("idle").play(1,true);
a.smoothed=false;
this.game.physics.arcade.enable(a);
return a;
};

//Level6.prototype.Next = function(player,goal){ 
//	
//	this.game.state.start("Level6");
//	
//}

Level6.prototype.addGoal = function(x, y) {
	var c = this.add.sprite(x, y, "go");
	c.anchor.set(0,0);
	c.scale.set(0.5);
	c.smoothed = false;
	this.game.physics.enable(c);
	c.body.collideWorldBounds = true;
	return c;
};

function gframes(key, n) {
	f = [];
	for (var i = 0; i <= n; i++) {
		f.push(key + "_" + "00" + i);
	}
	return f;
};
function kframes(key, n) {
	f = [];
	for (var i = 4; i <= n; i++) {
		f.push(key + "_" + "00" + i);
	}
	return f;
};
//}