
BasicGame.Producer = function (game) {

};

BasicGame.Producer.prototype = {

	create: function () {
        // Display adverstisements before game starts
        var ea = this.add.image(game.world.centerX, game.world.centerY, 'eaGames');
        var sierra = this.add.image(game.world.centerX, game.world.centerY, 'sierraGames');

        ea.alpha = 0;
        ea.anchor.setTo(0.5);
        ea.scale.setTo(0.2);
        sierra.alpha = 0;
        sierra.anchor.setTo(0.5);

        var tweenEA = this.add.tween(ea).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0);
        var tweenEAFade = this.add.tween(ea).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, false, 1500);
        var tweenSierra = this.add.tween(sierra).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, false, 0);
        var tweenSierraFade = this.add.tween(sierra).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, false, 1500);

        tweenEA.chain(tweenEAFade);
        tweenEAFade.chain(tweenSierra);
        tweenSierra.chain(tweenSierraFade);

        // Starts main menu
        tweenSierraFade.onComplete.add(function(){
            this.state.start('MainMenu');
        },this);
	}
};
