/* React */
import React from 'react';
import ReactDOM from 'react-dom';

/* Custom */
import Start from '../Start/Start.jsx';
import NotePad from '../NotePad/NotePad.jsx';
import GameEnd from '../GameEnd/GameEnd.jsx';

let colors = {
	start	: '#FE1B24',
	notepad	: '#008DE5',
	gameEnd	: '#01A358'
};

class Game extends React.Component {
	
	constructor(props) {

		super(props);

		this.state = {
			view	: 'start',
			players : ['Juan', 'Fran', 'Agus']
		};
	}

	startGame (players) {

		let view = 'notepad';

		this.setState({ players });

		this.setView(view);
	}

	setView (view) {
		
		this.setState({view});

		document.body.style.backgroundColor = colors[view];
	}

	endGame (data) {

		this.saveGame(data);

		this.setState({
			winner : data.winner.name
		});

		this.setView('gameEnd');
	}

	saveGame (data) {

		// If no previous history..
		if( ! localStorage.gameHistory ) {
			localStorage.setItem('gameHistory', '[]');
		}

		let local = JSON.parse(localStorage.getItem('gameHistory'));

		local.push(data);

		localStorage.setItem('gameHistory', JSON.stringify(local));
	}

	render () {

		switch(this.state.view) {

			case 'start': return <Start finishLoad={this.startGame.bind(this)} />;
			case 'notepad': return <NotePad players={this.state.players} onGameEnd={this.endGame.bind(this)} />;
			case 'gameEnd': return <GameEnd winner={this.state.winner} />;
		}
	}
}

ReactDOM.render(<Game/>, document.getElementsByClassName('app')[0]);