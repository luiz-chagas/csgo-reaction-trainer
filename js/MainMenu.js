
BasicGame.MainMenu = function (game) {

	//this.music = null;
	//this.playButton = null;
};

BasicGame.MainMenu.prototype = {

	create: function () {
		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

        var splash = this.add.image(game.world.centerX, game.world.centerY, 'splash');
        splash.anchor.setTo(0.5);
        splash.height = game.height;
        splash.width = game.width;

        var menuStyle = { font: "24px Special Elite", fill: "#F47B22"};
        var subMenuStyle = {font: "20px Arial", fill: "#FFFFFF"};
        var options = game.add.group();
        var subOptions = game.add.group();
        options.add(game.add.text(80, 360, "Play Game", menuStyle));
        options.add(game.add.text(80, 390, "Options", menuStyle));
        options.add(game.add.text(80, 420, "Credits", menuStyle));
        subOptions.add(game.add.text(240, 360, "This is just a demo, no game so far.", subMenuStyle));
        subOptions.add(game.add.text(240, 390, "It would be wonderful to tweak some parameters.", subMenuStyle));
        subOptions.add(game.add.text(240, 420, "Meet the amazing dev team.", subMenuStyle));

        options.forEach(function(item){
            item.anchor.setTo(0,1);
            item.stroke = '#000000';
            item.strokeThickness = 2;
            item.inputEnabled = true;
            item.setShadow(3, 3, 'rgba(0,0,0,0.5)', 15);
            item.events.onInputOver.add(function(item){
                item.fill = '#ffffff';
            }, this);
            item.events.onInputOut.add(function(item){
                item.fill = '#F47B22';
            }, this);
        });

        subOptions.forEach(function(item){
            item.anchor.setTo(0,1);
            item.stroke = '#000000';
            item.strokeThickness = 2;
            item.setShadow(3, 3, 'rgba(0,0,0,0.5)', 15);
        });

		// this.music = this.add.audio('titleMusic');
		// this.music.play();
        //
		// this.add.sprite(0, 0, 'titlepage');
        //
		// this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		// this.music.stop();
        //
		// And start the actual game
		this.state.start('Game');

	}

};
