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
	this.map = this.game.add.tilemap("c1-1");
	this.map.addTilesetImage('industrial.v1');

	this.maplayer = this.map.createLayer("TL1");
	this.maplayer1 = this.map.createLayer("TL2");
	this.maplayer2 = this.map.createLayer("TL3");

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
		if (obj.type == "bot") {
			var a = this.addSGT(obj.x, obj.y);
			this.enemies.add(a);
		} if (obj.type == "goal") {
			// เพิ่ม sprite goal
			var g = this.addGoal(obj.x,obj.y);
//			this.goal.add(g);
		}
		
	var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
	text.scale.set(1);
	
	this.createWeapon();
	this.createText();
	}
};

Level.prototype.createWeapon = function() {
	this.weapon1 = this.add.weapon(100, "bullet",10);	
	this.weapon2 = this.add.weapon(100, "bullet",10);	
	this.weapon1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon1.trackSprite(this.player, 75, -10);
	this.weapon1.bulletSpeed = 2000;
	this.weapon1.fireAngle = 0;
	this.weapon1.rate = 90000000000000;
	this.weapon1.bulletGravity.y = -1000;
	this.weapon2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon2.trackSprite(this.player, -75,-10);
	this.weapon2.bulletSpeed = 2000;
	this.weapon2.fireAngle = 180;
	this.weapon2.rate = 90000000000000;
	this.weapon2.bulletGravity.y = -1000;
	}

Level.prototype.update = function() {
	this.game.physics.arcade.collide(this.player,this.maplayer);
	this.game.physics.arcade.collide(this.enemies,this.maplayer);
	this.game.physics.arcade.collide(this.goal,this.maplayer);
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
					this.player.body.velocity.y=-500;
					this.player.play("jump");
					if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
				this.player.play("ffb");}} 
		 }else if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			this.player.body.velocity.x = -120;
			this.player.scale.x = -0.32;
			this.player.play("walk");
	
		}else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			this.player.body.velocity.x = 120;
			this.player.scale.x = 0.32;
			this.player.play("walk");
			
		}
		else if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			if(this.player.scale.x == -0.32){
			this.player.play("attack");
			this.fireWeaponback();}
			if(this.player.scale.x == 0.32){
				this.player.play("attack");
				this.fireWeapon();}
		}else {
			this.player.body.velocity.x = 0;
			this.player.play("idle");
		}
};
Level.prototype.createText = function (){
	msgTxt =  this.add.text(this.game.width/2,this.game.height/2, " ", { font: "25px TH SarabunPSK Bold", fill: "#ffffff" },this.ui);
	msgTxt.stroke = "#000";
	msgTxt.strokeThickness = 3;
	msgTxt.scale.set(5);
	msgTxt.anchor.set(0.5,0.5);
	
	winTxt =  this.add.text(this.game.width/2,this.game.height/2, " ", { font: "25px TH SarabunPSK Bold", fill: "#990000" },this.ui);
	winTxt.stroke = "#000";
	winTxt.strokeThickness = 3;
	winTxt.scale.set(1);
	winTxt.anchor.set(0.5,0.5);
	
	iTxt =  this.add.text(this.game.width/2,this.game.height/2, " ", { font: "25px TH SarabunPSK Bold", fill: "#0066cc" },this.ui);
	iTxt.stroke = "#000";
	iTxt.strokeThickness = 3;
	iTxt.scale.set(1);
	iTxt.anchor.set(0.5,0.5);
	
	sTxt =  this.add.text(this.game.width/2,this.game.height/2, " ", { font: "25px TH SarabunPSK Bold", fill: "#ff5050" },this.ui);
	sTxt.stroke = "#000";
	sTxt.strokeThickness = 3;
	sTxt.scale.set(1);
	sTxt.anchor.set(0.5,0.5);
	
	deTxt =  this.add.text(this.game.width/2,this.game.height/2, " ", { font: "25px TH SarabunPSK Bold", fill: "#ff0000" },this.ui);
	deTxt.stroke = "#000";
	deTxt.strokeThickness = 3;
	deTxt.scale.set(1);
	deTxt.anchor.set(0.5,0.5);
	tw = this.add.tween(msgTxt.scale);
	tw.to({x:1,y:1},1000,"Linear",true, 0, 0, false);
	this.time.events.add(1000,function(){this.text = "จ่าแม็คฟลาย : …คุณชื่อวินสตัน จากฝ่ายจารกรรมข้อมูลของกองทัพสัมพันธมิตรสินะ ";},msgTxt);
	this.time.events.add(6000,function(){this.text = "จ่าแม็คฟลาย : …คุณคือไอแซนฮาวล์ จากกองทัพเรือสัมพันธมิตรอเมริกาสินะ";},msgTxt);
	this.time.events.add(11000,function(){this.text = "จ่าแม็คฟลาย :คุณคือสตาร์ลิน นักรบแนวหน้าของกองทัพสัมพันธมิตรโซเวียตที่ถูกส่งตัวมาช่วยงานที่นี่สินะ";},msgTxt);
	this.time.events.add(16000,function(){this.text = "จ่าแม็คฟลาย : …คุณชื่อเดอกัวล์ นักดาบจากกองทัพสัมพันธมิตรฝรั่งเศสที่ประกาศยอมแพ้ไปแล้วสินะ";},msgTxt);
	this.time.events.add(20000,function(){this.visible=false},msgTxt);
	
	this.time.events.add(20000,function(){this.text = "วินสตัน : ใช่แล้ว หวังว่าที่นี่จะมีอะไรให้ผมทำมากกว่านั่งจิบชาอยู่เฉยๆนะ";},winTxt);
	this.time.events.add(24000,function(){this.visible=false;},winTxt);
	this.time.events.add(24000,function(){this.text = "ไอแซนฮาวล์ : ครับ ผมถูกส่งตัวมาที่ลอนดอนเมื่อวานนี้";},iTxt);
	this.time.events.add(28000,function(){this.visible=false;},iTxt);
	this.time.events.add(28000,function(){this.text = "สตาร์ลิน : อ่า ใช่แล้ว ที่นี่ไม่มีวอดก้าบ้างหรือ?";},sTxt);
	this.time.events.add(32000,function(){this.visible=false;},sTxt);
	this.time.events.add(32000,function(){this.text = "เดอกัวล์ : …";},deTxt);
	this.time.events.add(36000,function(){this.visible=false;},deTxt);
	
	(this.game.width/2,this.game.height/2,this.time.events.add(36000,function(){this.text = "จ่าแม็คฟลาย : ผมชื่อแม็คฟลาย ผมเป็นผู้ช่วยของคุณเอง แต่ก่อนที่ภารกิจใหม่ของคุณจะเริ่มขึ้น ท่านนายพลอูรัค ";},msgTxt));
	this.time.events.add(38000,function(){this.text = "ผู้บัญชาการกองทัพสัมพันธมิตรอังกฤษต้องการพบคุณพอดี ท่านรอคุณอยู่ด้านบน เดินไปทางขวาก็เจอทางขึ้นแล้ว;"},msgTxt);
	this.time.events.add(38000,function(){this.visible=true;},msgTxt);

//	this.time.events.add(20000,function(){this.text = "วินสตัน : ใช่แล้ว หวังว่าที่นี่จะมีอะไรให้ผมทำมากกว่านั่งจิบชาอยู่เฉยๆนะ";},winTxt);
//	this.time.events.add(24000,function(){this.visible=true;},winTxt);
//	this.time.events.add(24000,function(){this.text = "ไอแซนฮาวล์ : ครับ ผมถูกส่งตัวมาที่ลอนดอนเมื่อวานนี้";},iTxt);
//	this.time.events.add(28000,function(){this.visible=true;},iTxt);
//	this.time.events.add(28000,function(){this.text = "สตาร์ลิน : อ่า ใช่แล้ว ที่นี่ไม่มีวอดก้าบ้างหรือ?";},sTxt);
//	this.time.events.add(32000,function(){this.visible=true;},sTxt);
//	this.time.events.add(32000,function(){this.text = "เดอกัวล์ : …";},deTxt);
//	this.time.events.add(36000,function(){this.visible=true;},deTxt);
	
//	วินสตัน : รับทราบ ผมจะไปเดี๋ยวนี้
//	ไอแซนฮาวล์ : รับทราบ
//	สตาร์ลิน : ทราบแล้ว
//	เดอกัวล์ : เราต้องไปใช่ไหม?

}
Level.prototype.addPlayer = function(x, y) {
	
	var t = this.add.sprite(x, y, "Winston");
	t.animations.add("idle", gframes("Winston-True-Idle", 2),2, true);
	t.animations.add("walk", gframes("Winston-Walk", 5), 5, true);
	t.animations.add("jump", gframes("Winston-Jump", 5), 5, true);
	t.animations.add("attack", kframes("Winston-Fire", 5), 10, true);
	t.animations.add("ffb", gframes("Winston-Fire-From-Above", 5), 20, true);
	t.anchor.set(0.5, 0.5);
	t.scale.set (0.32);
	t.smoothed = false;
	this.game.physics.arcade.enable(t);
	t.play("idle");
	t.body.collideWorldBounds = true;
	return t;
	
	
};
Level.prototype.fireWeaponback = function (){
	this.weapon2.fire();
};
Level.prototype.fireWeapon = function (){
	this.weapon1.fire();
};

Level.prototype.addSGT = function(x, y) {
		var a = this.add.sprite(x, y,
	"SGTMcFry");
		a.anchor.set(-1, 0.5);
a.scale.set(0.3);
a.animations.add("idle").play(1,true);
a.smoothed=false;
this.game.physics.arcade.enable(a);
return a;
};

//Level.prototype.Next = function(player,goal){ 
//
//	this.game.state.start("Level2");
//	
//}

Level.prototype.addGoal = function(x, y) {
	c = this.add.sprite(x, y, "goal");
	c.anchor.set(0,0);
	c.scale.set(0.2);
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
	for (var i = 1; i <= n; i++) {
		f.push(key + "_" + "00" + i);
	}
	return f;
};
//}