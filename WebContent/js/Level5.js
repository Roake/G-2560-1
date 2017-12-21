/**
 * Level5 state.
 */
function Level5() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Level5.prototype = proto;


Level5.prototype.create = function() {
	background = this.add.tileSprite(0, 0, 1024, 768, "BG");
	background.scale.set(1);
	background.fixedToCamera = true;
	this.map = this.game.add.tilemap("c2-1");
	this.map.addTilesetImage('industrial.v1');
//this.map.addTilesetImage('tileset4');
	this.maplayer = this.map.createLayer("TL1");
	this.maplayer1 = this.map.createLayer("TL2");
	
	var sewer = this.add.sound("c1-1bgm",0.5,true,true);
	sewer.play();
	this.game.score = 0;
	this.gameover=false;
//	this.player.alive=true;
	this.hitmark=this.add.audio("hit");
	this.hitmark.allowMultiple=true;
	this.gun = this.add.audio("gun");
	this.gun.allowMultiple=true;
	this.maplayer.resizeWorld();
	this.map.setCollisionBetween(0,1000,true,this.maplayer);
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.physics.arcade.gravity.y = 1000;
	
	this.scoreText = this.add.text(this.game.camera.width/2.5, 0, 'Score : '+this.game.score,{ font: '25px Arial',fill: 'white' });
	this.scoreText.stroke="#000";
	this.scoreText.strokeThickness=6;
	this.scoreText.fixedToCamera = true;
	
//if(this.game.character==1){
	this.bot = this.add.group();
	this.goal=this.add.group();
	this.enemy=this.add.group();
	this.hp=this.add.group();
	for (x  in this.map.objects.object) {
	var obj = this.map.objects.object[x];
	if (obj.type == "player") {
			
			this.player = this.addPlayer(obj.x, obj.y);
			this.game.camera.follow(this.player,Phaser.Camera.FOLLOW_PLATFORMER);
			this.player.canhit=true;
			 this.player.maxHealth = 6;
			 this.player.setHealth(3);
			 
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
			
//			this.enemy.canhit=true;
//			this.enemy.maxHealth = 3;
//			this.enemy.setHealth(3);
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

Level5.prototype.createWeapon = function() {
	this.weapon1 = this.add.weapon(100, "bullet",10);	
	this.weapon2 = this.add.weapon(100, "bullet",10);	
	this.weapon1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon1.trackSprite(this.player, 75, -10);
	this.weapon1.bulletSpeed = 700;
	this.weapon1.fireAngle = 0;
	this.weapon1.rate = 500;
	this.weapon1.bulletCollideWorldBounds1;
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

Level5.prototype.update = function() {
	
	this.game.physics.arcade.collide(this.player,this.maplayer);
	this.game.physics.arcade.collide(this.enemy,this.maplayer);
	this.game.physics.arcade.collide(this.bot,this.maplayer);
	this.game.physics.arcade.collide(this.goal,this.maplayer);
	this.game.physics.arcade.collide(this.weapon1.bullets,this.maplayer);
	this.game.physics.arcade.collide(this.weapon2.bullets,this.maplayer);
	
	this.physics.arcade.collide(this.player,this.goal,this.Next,null,this);
	this.game.physics.arcade.collide(this.hp,this.maplayer);
	this.physics.arcade.collide(this.hp,this.player,this.playerCollideHp,null,this);
	this.physics.arcade.collide(this.enemy,this.weapon1.bullets,this.onCollide,null,this);
	this.physics.arcade.collide(this.enemy,this.weapon2.bullets,this.onCollide,null,this);
	this.physics.arcade.collide(this.weapon1.bullets,this.maplayer,this.bulletOnCollideWorld(),null,this);
	this.physics.arcade.collide(this.weapon2.bullets,this.maplayer,this.bulletOnCollideWorld(),null,this);
	 if(this.player.canhit){
		 this.physics.arcade.collide(this.enemy,this.player,this.onPlayerCollide,null,this);
		 }
	
//	 this.enemy.forEachAlive(function(e){
//		 if(e.x > this.world.width) e.x = -Math.random() * 300;
//		 },this);
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
		this.player.body.velocity.x=-200;
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

Level5.prototype.addHealth = function(hp) {

    //score text
    addHeal = this.add.text(hp.x, hp.y, 'HP++', {
        fill: 'yellow'
    });
    delay = this.add.tween(addHeal);
    delay.to({
        y: hp.y-20
    }, 500, "Linear", true, 600);
    delay.onComplete.add(function(addHeal) {
        addHeal.kill();
    }, this);
    this.player.heal(2);
    var sf = this.add.audio("heal");
    sf.play();
    this.game.score++;
	this.scoreText.text = 'Score : '+this.game.score;
    //kill the +1 on delay play complete
}

//ด้านล่างนี้เดี๋ยวซ่อมเองนะ อย่าลืมล่ะ (บอกตัวเอง)
//Level5.prototype.createText = function (){
//	msgTxt  = this.add.button(this.world.centerX, this.world.centerY,
//	"SGT1-1");
//	msgTxt.scale.set(1);
//	msgTxt.anchor.set(0.5,0.5);
//	this.input.onDown.add(this.WIN1, this);
//	this.time.events.add(10000,function(){this.destroy();},msgTxt);
//	
//	}
//Level5.prototype.WIN1 = function() {
//	msgTxt.loadTexture("WIN1-1",0);
//			this.input.onDown.add(this.SGT2, this);
//		}
//Level5.prototype.SGT2 = function() {
//	msgTxt.loadTexture("SGT1-2",0);
//			this.input.onDown.add(this.SGT3, this);
//		}
//Level5.prototype.SGT3 = function() {
//	msgTxt.loadTexture("SGT1-3",0);
//			this.input.onDown.add(this.SGT4, this);
//		}	
//Level5.prototype.SGT4 = function() {
//	msgTxt.loadTexture("SGT1-4",0);
//			this.input.onDown.add(this.SGT5, this);
//		}
//Level5.prototype.SGT5 = function() {
//	msgTxt.loadTexture("SGT1-5",0);
//			this.input.onDown.add(this.WIN2, this);
//		}
//Level5.prototype.WIN2 = function() {
//	msgTxt.loadTexture("WIN1-2",0);
//	
//		}
Level5.prototype.bulletOnCollideWorld = function(bullet){
	
	
}
Level5.prototype.playerCollideHp = function (player,hp){
	hp.kill();
	this.addHealth(hp);
	this.game.score++;
	

}

Level5.prototype.addPlayer = function(x, y) {
	
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

Level5.prototype.addEnemy = function(x, y) {
	
	var t = this.add.sprite(x, y, "Wehrmacht");
	t.animations.add("idle", gframes("Wehrmacht-Idle", 2),2, true);
	t.animations.add("walk", gframes("Wehrmacht-Walk", 5), 5, true);
	
	t.animations.add("attack", gframes("Wehrmacht-Attack", 2), 10, true);
	
	t.anchor.set(0.5, 0.5);
	t.scale.set (0.2);
	t.smoothed = false;
	this.game.physics.arcade.enable(t);
	t.play("idle");
	t.body.collideWorldBounds = true;
	t.health=5;
	t.maxHealth=5;
	return t;
	
	
};

Level5.prototype.addHp = function(x,y){
	var h = this.add.sprite(x,y,"medkit");
	h.anchor.set(0.5,1);
	h.scale.set(0.05);
	this.game.physics.arcade.enable(h);
	
	h.body.collideWorldBounds=true;
	return h;
	
}

Level5.prototype.onPlayerCollide = function(player,enemy){
	player.damage(1);
	enemy.damage(1);
	player.canhit = false;
	player.alpha = 0.1;
	this.hitmark.play();
	var tw = this.add.tween(player);
	tw.to({alpha:1},200, "Linear",true,0,5);
	tw.onComplete.addOnce(function(){this.alpha=1;this.canhit=true;}, player);
	
	enemy.canhit = false;
	enemy.alpha = 0.1;
	this.hitmark.play();
	var tw = this.add.tween(enemy);
	tw.to({alpha:1},200, "Linear",true,0,5);
	tw.onComplete.addOnce(function(){this.alpha=1;this.canhit=true;}, enemy);
	addHeal = this.add.text(enemy.x,enemy.y, 'Score+', {
        fill: 'red'
    });
    delay = this.add.tween(addHeal);
    delay.to
    delay.to({ y: enemy.y-50 }, 300, "Linear", true, 1);
    delay.onComplete.add(function(addHeal) {
        addHeal.kill();
    }, this);
    exp = this.add.sprite(enemy.x, enemy.y,"hitmark");
	exp.anchor.set(0.4,0.5);
	exp.scale.set(0.6);
	exp.animations.add("all",null,12,false).play().killOnComplete=true;
	this.hitmark.play();
	
	this.game.score++;
	this.scoreText.text = 'Score : '+this.game.score;
	return true;
	}


Level5.prototype.onCollide = function(enemy,bullet){
	enemy.damage(1);
	bullet.kill();
	
	//this.game.score++;
	
//	this.scoreText.text = ''+this.game.score;
	addHeal = this.add.text(enemy.x,enemy.y, 'Score+', {
        fill: 'red'
    });
    delay = this.add.tween(addHeal);
    delay.to
    delay.to({ y: enemy.y-50 }, 300, "Linear", true, 1);
    delay.onComplete.add(function(addHeal) {
        addHeal.kill();
    }, this);
	
	exp = this.add.sprite(enemy.x, enemy.y,"hitmark");
	exp.anchor.set(0.4,0.5);
	exp.scale.set(0.6);
	exp.animations.add("all",null,12,false).play().killOnComplete=true;
	this.hitmark.play();
	
	this.game.score++;
	this.scoreText.text = 'Score : '+this.game.score;
	
	
	};
	
Level5.prototype.addEnemy2 = function(x, y) {
	
	var t = this.add.sprite(x, y, "Wehrmacht");
	t.animations.add("idle", gframes("Wehrmacht-Idle", 2),2, true);
	t.animations.add("walk", gframes("Wehrmacht-Walk", 5), 5, true);
	
	t.animations.add("attack", gframes("Wehrmacht-Attack", 2), 10, true);
	
	t.anchor.set(0.5, 0.5);
	t.scale.set(0.2);
	t.scale.x=-0.2;
	t.smoothed = false;
	this.game.physics.arcade.enable(t);
	t.play("idle");
	t.body.collideWorldBounds = true;
	t.alive=true;
	t.maxHealth=3;
	t.setHealth(3);
	
	return t;
	
	
};

Level5.prototype.fireWeaponback = function (){
	if(this.weapon2.fire()!=false){
		this.gun.play();
	}
	
	this.weapon2.fire();
};
Level5.prototype.fireWeapon = function (){
	if(this.weapon1.fire()!=false){
		this.gun.play();
	}
	this.weapon1.fire();
};

Level5.prototype.addSGT = function(x, y) {
		var a = this.add.sprite(x, y,
	"SGTMcFry");
		a.anchor.set(-1, 0.5);
a.scale.set(0.2);
a.animations.add("idle").play(1,true);
a.smoothed=false;
this.game.physics.arcade.enable(a);
return a;
};

Level5.prototype.Next = function(player,goal){ 
	
	this.game.state.start("Level6");
	
}

Level5.prototype.addGoal = function(x, y) {
	var c = this.add.sprite(x, y, "go");
	c.anchor.set(0,0);
	c.scale.set(0.5);
	c.smoothed = false;
	this.game.physics.enable(c);
	c.body.collideWorldBounds = true;
	return c;
};

Level5.prototype.onPlayerKilled = function(){
	
	this.gameover=true;
	
	
		txt=this.add.text(this.world.centerX,this.world.centerY,
	 "WASTED",{ fill: 'Red'});

	var tw = this.add.tween(txt.scale);
	tw.to({x:3,y:3},1000, "Linear",true,0);
	delay = this.add.tween(txt);
	delay.to({y:100},1000, "Linear",true,2000);
	tw.chain(delay);
	delay.onComplete.addOnce(this.quitGame, this);
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
