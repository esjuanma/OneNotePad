import React from 'react';
import Errors from '../Errors/Errors.jsx';

class Start extends React.Component {

	constructor(props) {
		
		super(props)

		this.state = {
			player		: '',
			players		: [],
			fadedNames	: [],
			errorMessage: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.submit = this.submit.bind(this);
		this.finishLoad = this.finishLoad.bind(this);
	}

	finishLoad () {

		let players = this.submit();

		if(players.length < 2) {

			this.setState({
				errorMessage : {
					message	: 'Debe haber al menos 2 jugadores',
					icon	: 'exclamation-triangle'
				}
			});

			return;
		}

		this.props.finishLoad(players);
	}

	handleChange (event) {

		this.setState({player: event.target.value});
	}

	submit (event) {

		event && event.preventDefault();
		
		let player = this.state.player;

		if(player == '') return this.state.players;

		let players = this.state.players.concat([player]);

		this.setState({
			player		: '',
			players		: players,
			fadedNames	: this.state.fadedNames.concat(player)
		});

		this.removeFadedName();

		return players;
	}

	removeFadedName () {

		setTimeout(() => {

			this.setState({
				fadedNames : this.state.fadedNames.slice(1)
			});	

		}, 1000);
	}

	pantallaCompleta () {

		document.body.requestFullscreen();
	}

	removeError () {

		this.setState({
			errorMessage : null
		});
	}

	render () {
		
		return (

			<div className="step start">
				
				<form onSubmit={this.submit}>
					
					<div className="title animated slideInUp">
						<i className="fa fa-group"></i>Jugadores
					</div>
					
					<div className="input-container animated slideInUp">
						{/* Player input */}
						<input value={this.state.player} type="text" className="players" onChange={this.handleChange} />
						{/* Right arrow */}
						<i className="fa fa-arrow-right user-submit" onClick={this.submit}></i>
						{/* Faded name animation */}
						{this.state.fadedNames.length != 0 &&
							this.state.fadedNames.map(fadedName => <div className="faded-name animated fadeOutUp">{fadedName}</div>)
						}
					</div>

					{/* Finish load */}
					<div className="prompt-submit animated slideInUp" onClick={this.finishLoad}><i className="fa fa-check"></i></div>

				</form>

				<Errors errorMessage={this.state.errorMessage} onErrorClose={this.removeError.bind(this)} />

			</div>
		);
	}
}

export default Start;