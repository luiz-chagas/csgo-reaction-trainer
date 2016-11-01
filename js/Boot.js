var BasicGame = {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

    init: function () {
        if (this.game.device.desktop)
        {
            //  If you have any desktop specific settings, they can go in here
        }
        else
        {
            //  Same goes for mobile settings.
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //this.scale.forceLandscape = true;
            this.scale.pageAlignVertically = true;
        }
        this.scale.setMinMax(480, 260, 800, 600);
        this.scale.pageAlignHorizontally = true;
        this.input.maxInputs = 1;
        this.game.stage.smoothed = false;
    },

    preload: function () {
        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        //this.load.image('preloaderBackground', 'images/preloader_background.jpg');
        this.load.image('loader', 'images/loader.png');

    },

    create: function () {
        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('Preloader');
    }

};
