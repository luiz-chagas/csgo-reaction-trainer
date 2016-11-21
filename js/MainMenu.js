
BasicGame.MainMenu = function (game) {

	//this.music = null;
	//this.playButton = null;
};

BasicGame.MainMenu.prototype = {

	create: function () {
		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)
        var self = this;

        var splash = this.add.image(this.game.world.centerX, this.game.world.centerY, 'splash');
        splash.anchor.setTo(0.5);
        splash.height = this.game.height;
        splash.width = this.game.width;

        var menuStyle = { font: "20px Special Elite", fill: "#1f5da8"};
        //var subMenuStyle = {font: "20px Arial", fill: "#FFFFFF"};
        var options = this.game.add.group();
        //var subOptions = this.game.add.group();
        options.add(this.game.add.text(80, 330, "Play Easy", menuStyle));
        options.add(this.game.add.text(80, 360, "Play Medium", menuStyle));
        options.add(this.game.add.text(80, 390, "Play Hard", menuStyle));
        options.add(this.game.add.text(80, 420, "Options", menuStyle));
        options.add(this.game.add.text(80, 450, "Credits", menuStyle));
        // subOptions.add(this.game.add.text(240, 330, "For beginners, gold nova level.", subMenuStyle));
        // subOptions.add(this.game.add.text(240, 360, "For experienced players, badge level.", subMenuStyle));
        // subOptions.add(this.game.add.text(240, 390, "For inhuman reactions, global level.", subMenuStyle));
        // subOptions.add(this.game.add.text(240, 420, "Nothing here yet.", subMenuStyle));
        // subOptions.add(this.game.add.text(240, 450, "Nothing here yet.", subMenuStyle));

        options.forEach(function(item){
            item.anchor.setTo(0,1);
            item.stroke = '#000000';
            item.strokeThickness = 3;
            item.inputEnabled = true;
            item.setShadow(3, 3, 'rgba(0,0,0,0.5)', 15);
            item.events.onInputOver.add(function(item){
                item.fill = '#ffffff';
            }, this);
            item.events.onInputOut.add(function(item){
                item.fill = '#1f5da8';
            }, this);
            item.events.onInputDown.add(self.menuClicked, this);
        });

        // subOptions.forEach(function(item){
        //     item.anchor.setTo(0,1);
        //     item.stroke = '#000000';
        //     item.strokeThickness = 2;
        //     item.setShadow(3, 3, 'rgba(0,0,0,0.5)', 15);
        // });
	},

    menuClicked: function(item) {
            switch(item.text){
                    case "Play Easy":
                        this.game.state.start('Game', true, false, 3);
                        break;
                    case "Play Medium":
                        this.game.state.start('Game', true, false, 2);
                        break;
                    case "Play Hard":
                        this.game.state.start("Game", true, false, 1);
                        break;
                }
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
