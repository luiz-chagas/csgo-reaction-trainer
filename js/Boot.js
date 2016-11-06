var BasicGame = {
};

BasicGame.Boot = function (game) {
};

BasicGame.Boot.prototype = {

    init: function () {
        if (this.game.device.desktop)
        {
        }
        else
        {
            //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //this.scale.forceLandscape = true;
            //this.scale.pageAlignVertically = true;
        }
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setMinMax(480, 260, 800, 600);
        this.scale.pageAlignHorizontally = true;
        this.input.maxInputs = 1;
        this.game.stage.smoothed = false;
    },

    preload: function () {
        this.load.image('loader', 'images/loader.png');
    },

    create: function () {
        this.state.start('Preloader');
    }

};
