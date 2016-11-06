
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
    this.money;
    this.moneyOverlay;
    this.health;
    this.healthOverlay;
};

BasicGame.Game.prototype = {

    create: function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);

        var self = this;

        this.ak47 = this.add.audio('ak47');
        this.ak47.volume = 0.1;
        this.ak47.allowMultiple = true;

        //var background = this.add.image(game.world.centerX, game.world.centerY+100, 'dust2bg');
        //var backgroundOverlay = this.add.image(game.world.centerX, game.world.centerY+100, 'dust2');
        this.difficulty = 10;
        this.money = 0;
        this.health = 100;

        this.background = this.add.sprite(0, 0, 'dust2bg');

        this.enemies = this.add.group();

        this.spawn();

        this.backgroundOverlayLeft = this.add.sprite(0, 0, 'dust2L');
        this.backgroundOverlayRight = this.add.sprite(1060, 0, 'dust2R');
        this.physics.arcade.enable(this.backgroundOverlayLeft);
        this.physics.arcade.enable(this.backgroundOverlayRight);

        this.overlayStyle = {font: "22px Arial", fill: "#F69D44"};
        this.moneyOverlay = this.add.text(20,280,"$" + this.money, this.overlayStyle);
        this.moneyOverlay.fixedToCamera = true;
        this.healthOverlay = this.add.text(40,550,this.health, this.overlayStyle);
        this.healthOverlay.fixedToCamera = true;


        this.handOverlay = this.game.add.image(0, 145, 'hand');
        this.handOverlay.scale.setTo(0.8);
        //this.handOverlay.width = 800;
        //this.handOverlay.height = 600;

        this.lastShot = 0;
        //background.anchor.setTo(0.5);
        //background.height = this.game.height;
        //background.scale.setTo(1);
        //backgroundOverlay.anchor.setTo(0.5);
        //backgroundOverlay.height = this.game.height;
        //backgroundOverlay.scale.setTo(1);
        //background.width = this.game.width;
        //var splash = this.add.image(game.world.centerX, game.world.centerY, 'splash');
        this.world.setBounds(0, 0, 1920,1080);
        this.camera.y = 150;

        this.time.events.loop(3 * Phaser.Timer.SECOND, this.peek, this);
        this.input.onDown.add(this.fire, this);
    },

    leftPeek: function(delay) {
        this.enemy.x = 790;
        var go = this.add.tween(this.enemy).to({x:840}, 50*this.difficulty, Phaser.Easing.Linear.None, true, delay*500);
        var back = this.add.tween(this.enemy).to({x:790}, 50*this.difficulty, Phaser.Easing.Linear.None, false);
        go.chain(back);
        back.onComplete.add(this.hitPlayer, this);
    },

    hitPlayer: function(){
        this.health -= 10;
    },

    rightPeek: function(delay){
        this.enemy.x = 1100;
        var go = this.add.tween(this.enemy).to({x:1050}, 50*this.difficulty, Phaser.Easing.Linear.None, true, delay*500);
        var back = this.add.tween(this.enemy).to({x:1100}, 50*this.difficulty, Phaser.Easing.Linear.None, false);
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
                this.difficulty--;
                this.money += 300;
                if(this.difficulty==0){
                    this.quitGame();
                }
                this.enemy.destroy();
                this.spawn();
            }else{
                this.money = (this.money > 0) ? this.money-50 : 0;
            }
        }
    },

    // hit: function(player){
    //     var dx = this.game.input.x + this.game.camera.x;
    //     var dy = this.game.input.y + this.game.camera.y;
    //     if(player.body.hitTest(dx, dy)){
    //         this.animateGun();
    //         player.destroy();
    //         this.difficulty--;
    //         console.log(this.difficulty);
    //         if(this.difficulty==0){
    //             this.quitGame();
    //         }
    //         this.spawn();
    //     }
    // },

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
        this.add.tween(this.handOverlay).to({y:165}, 50, Phaser.Easing.Linear.None, true, 0, 0, true);
    },

    update: function () {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.camera.x = this.input.activePointer.x/2 + 350;
        this.handOverlay.x = this.input.activePointer.x/2 + 250;
        this.moneyOverlay.text = "$" + this.money;
        this.healthOverlay.text = this.health;
    },

    render: function(){
        //game.debug.body(this.enemy);
    },

    quitGame: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.world.setBounds(0, 0, 800, 600);
        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
