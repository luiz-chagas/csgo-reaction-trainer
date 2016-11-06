
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    this.enemy;
    this.background;
    this.backgroundOverlayLeft;
    this.backgroundOverlayRight;
    this.enemies;
    this.difficulty;
    this.handOverlay;
    this.lastShot;
    this.ak47;
    this.overlayStyle;
    this.score;
    this.scoreOverlay;
    this.health;
    this.healthOverlay;
    this.kills;
    this.killsOverlay;
};

BasicGame.Game.prototype = {
    
    init: function(dif){
        this.difficulty = dif;
        this.score = 0;
        this.health = 100;
        this.kills = 0;
    },

    create: function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);

        var self = this;

        this.ak47 = this.add.audio('ak47');
        this.ak47.volume = 0.1;
        this.ak47.allowMultiple = true;

        this.background = this.add.image(0, 0, 'dust2bg');

        this.enemies = this.add.group();

        this.spawn();

        this.backgroundOverlayLeft = this.add.sprite(0, 0, 'dust2L');
        this.backgroundOverlayRight = this.add.sprite(1060, 0, 'dust2R');
        this.physics.arcade.enable(this.backgroundOverlayLeft);
        this.physics.arcade.enable(this.backgroundOverlayRight);

        this.overlayStyle = {font: "20px Bungee Hairline", fill: "#209606"};
        
        this.scoreOverlay = this.add.text(20, 280, "", this.overlayStyle);
        this.scoreOverlay.fixedToCamera = true;
        this.healthOverlay = this.add.text(20, 530, "", this.overlayStyle);
        this.healthOverlay.fixedToCamera = true;
        this.killsOverlay = this.add.text(720, 280, "", this.overlayStyle);
        this.killsOverlay.fixedToCamera = true;

        this.handOverlay = this.game.add.image(0, 145, 'hand');
        this.handOverlay.scale.setTo(0.8);

        this.lastShot = 0;

        this.world.setBounds(0, 0, 1920,1080);
        this.camera.y = 150;

        this.time.events.loop(3 * Phaser.Timer.SECOND, this.peek, this);
        this.input.onDown.add(this.fire, this);
    },

    leftPeek: function(delay) {
        this.enemy.x = 790;
        var returnDelay = (this.difficulty+1) * 250;
        var go = this.add.tween(this.enemy).to({x:850}, 200, Phaser.Easing.Linear.None, true, delay*500);
        var back = this.add.tween(this.enemy).to({x:790}, 200, Phaser.Easing.Linear.None, false, returnDelay);
        go.chain(back);
        back.onComplete.add(this.hitPlayer, this);
    },

    hitPlayer: function(){
        this.health -= 10;
        if(this.health == 0){
            this.quitGame();
        }
    },

    rightPeek: function(delay){
        this.enemy.x = 1100;
        var returnDelay = (this.difficulty+1) * 250;
        var go = this.add.tween(this.enemy).to({x:1040}, 200, Phaser.Easing.Linear.None, true, delay*500);
        var back = this.add.tween(this.enemy).to({x:1100}, 200, Phaser.Easing.Linear.None, false, returnDelay);
        go.chain(back);
        back.onComplete.add(this.hitPlayer, this);
    },

    peek: function(){
        var n = this.rnd.integerInRange(0,1);
        var delay = this.rnd.integerInRange(1,4);
        switch(n){
            case 0:
                this.leftPeek(delay);
                break;
            case 1:
                this.rightPeek(delay);
                break;
        }
    },

    fire: function(){
        if(this.time.now > this.lastShot+200){
            this.lastShot = this.time.now;
            this.ak47.play();
            this.animateGun();
            var dx = this.input.x + this.game.camera.x;
            var dy = this.input.y + this.game.camera.y;
            if(this.enemy.body.hitTest(dx, dy) && !this.backgroundOverlayLeft.body.hitTest(dx, dy) && !this.backgroundOverlayRight.body.hitTest(dx, dy)){
                this.kills++;
                this.score += 300;
                if(this.kills==10){
                    this.quitGame();
                }
                this.enemy.destroy();
                this.spawn();
            }else{
                this.score = (this.score > 0) ? this.score-50 : 0;
            }
        }
    },

    spawn: function(group){
        this.enemy = this.add.sprite(780, 510, 'enemy');
        //this.enemy = this.add.sprite(950, 500, 'enemy');
        this.physics.arcade.enable(this.enemy);
        this.enemy.anchor.setTo(0.5);
        this.enemy.scale.setTo(0.4);
        //this.enemy.scale.x *= -1;
        this.enemy.body.setSize(150, 400, 20, 0);
        //this.enemy.inputEnabled = true;
        //this.enemy.events.onInputDown.add(this.hit,this);
	    this.enemies.add(this.enemy);
        //this.game.world.bringToTop(this.backgroundOverlay);
    },

    animateGun: function(){
        var toY = this.handOverlay.y + 50;
        this.add.tween(this.handOverlay).to({y:toY}, 50, Phaser.Easing.Linear.None, true, 0, 0, true);
    },

    update: function () {
        this.camera.x = this.input.activePointer.x + 200;
        this.camera.y = this.input.activePointer.y/2;
        this.handOverlay.x = this.input.activePointer.x + 200;
        this.handOverlay.y = this.input.activePointer.y/2;
        
        this.scoreOverlay.text = "Score\n" + this.score;
        this.healthOverlay.text = "Health\n" + this.health;
        this.killsOverlay.text = "Kills\n" + this.kills + "/10";
    },

    render: function(){
        //game.debug.body(this.enemy);
    },

    quitGame: function () {
        this.enemy.destroy();
        this.world.setBounds(0, 0, 800, 600);
        this.state.start('MainMenu');

    }

};
