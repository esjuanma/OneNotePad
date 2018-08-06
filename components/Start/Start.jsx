import React from 'react';
import Errors from '../Errors/Errors.jsx';

class Start extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			// Current player being loaded
			player: '',

			// Current loaded players
			players: [],

			// Just for animation purposes
			fadedNames: [],

			// Loading error message
			errorMessage: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.submit = this.submit.bind(this);
		this.finishLoad = this.finishLoad.bind(this);
	}

	finishLoad () {
		const players = this.submit();

		if(players.length < 2) {
			this.setState({
				errorMessage : {
					message: 'Debe haber al menos 2 jugadores',
					icon: 'exclamation-triangle'
				}
			});
		} else {
			this.props.finishLoad(players);
		}
	}

	handleChange (event) {
		this.setState({
			player: event.target.value
		});
	}

	submit (event) {
		event && event.preventDefault();
		
		const { player, players, fadedNames } = this.state;

		if (player == '') {
			return players;
		}

		const newPlayers = [...players, player];

		this.setState({
			players: newPlayers,
			player: '',
			fadedNames: [..fadedNames, player]
		});

		this.removeFadedName();

		return newPlayers;
	}

	removeFadedName () {
		setTimeout(() => {
			this.setState({
				fadedNames: this.state.fadedNames.slice(1)
			});	
		}, 1000);
	}

	pantallaCompleta () {
		document.body.requestFullscreen();
	}

	removeError () {
		this.setState({
			errorMessage: null
		});
	}

	render () {
		const {
			players,
			player,
			fadedNames,
			errorMessage
		} = this.state;

		// When there's 2 players or 2nd is being loaded, you can start the game
		const readyToStart = players.length && (
			players.length >= 2 || player !== ''
		);

		return (
			<div className="step start">
				
				<form onSubmit={this.submit}>
					
					<div className="title animated slideInUp">
						<i className="fa fa-group"></i>Jugadores
					</div>
					
					<div className="input-container animated slideInUp">
						
						{/* Player input */}
						<input value={player} type="text" className="players" onChange={this.handleChange} />
						
						{/* Right arrow */}
						<i className="fa fa-arrow-right user-submit" onClick={this.submit}></i>
						
						{/* Faded name animation */}
						{fadedNames.length != 0 &&
							fadedNames.map(fadedName => <div className="faded-name animated fadeOutUp">{fadedName}</div>)
						}
					</div>

					{/* Finish load */}
					<div className={`prompt-submit animated slideInUp ${readyToStart && 'ready'}`} onClick={this.finishLoad}><i className="fa fa-check"></i></div>

				</form>

				<Errors errorMessage={errorMessage} onErrorClose={this.removeError.bind(this)} />

			</div>
		);
	}
}

export default Start;
