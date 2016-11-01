
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
    var ctLeft;
    var background;
    var backgroundOverlay;
    var enemies;
    var difficulty;
};

BasicGame.Game.prototype = {

    create: function () {
        var self = this;
        
        //var background = this.add.image(game.world.centerX, game.world.centerY+100, 'dust2bg');
        //var backgroundOverlay = this.add.image(game.world.centerX, game.world.centerY+100, 'dust2');
        this.difficulty = 10;
        
        this.background = this.add.sprite(0, 0, 'dust2bg');
        
        this.enemies = this.game.add.group();
        
        this.spawn();
        
        this.backgroundOverlay = this.game.add.sprite(0, 0, 'dust2');
        
        //background.anchor.setTo(0.5);
        //background.height = this.game.height;
        //background.scale.setTo(1);
        //backgroundOverlay.anchor.setTo(0.5);
        //backgroundOverlay.height = this.game.height;
        //backgroundOverlay.scale.setTo(1);
        //background.width = this.game.width;
        //var splash = this.add.image(game.world.centerX, game.world.centerY, 'splash');
        this.game.world.setBounds(0, 0, 1920,1080);
        this.game.camera.y = 150;
        

        this.game.time.events.loop(2 * Phaser.Timer.SECOND, this.leftPeek, this);
    },

    leftPeek: function() {
        var go = this.game.add.tween(this.ctLeft).to({x:850}, 50*this.difficulty, Phaser.Easing.Linear.None, true);
        var back = this.game.add.tween(this.ctLeft).to({x:780}, 50*this.difficulty, Phaser.Easing.Linear.None, false);
        go.chain(back);
    },
    
    hit: function(player){
        player.destroy();
        this.difficulty--;
        console.log(this.difficulty);
        if(this.difficulty==0){
            this.quitGame();
        }
        this.spawn();
    },
    
    spawn: function(group){
        console.log("Spawning!");
        this.ctLeft = this.add.image(780, 500, 'ct');
        this.ctLeft.anchor.setTo(0.5);
        this.ctLeft.scale.setTo(0.6);
        this.ctLeft.inputEnabled = true;
        this.ctLeft.events.onInputDown.add(this.hit, this);
	    this.enemies.add(this.ctLeft);
        //this.game.world.bringToTop(this.backgroundOverlay);
    },

    update: function () {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.camera.x = this.input.activePointer.x/2 + 300;
    },

    quitGame: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.game.world.setBounds(0, 0, 800, 600);
        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
