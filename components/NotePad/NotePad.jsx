import React from 'react';
import Clock from '../Clock/Clock.jsx';
import Errors from '../Errors/Errors.jsx';
import Player from '../../js/Player.js';

class NotePad extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			playersQuantity	: props.players.length,
			players			: this.genPlayers(props.players),
			nextPoints		: this.pointsList('', props.players.length),
			elapsedTime		: 0,
			loadingPoints	: false,
			winner			: null,
			history			: [{
				time		: 0,
				points		: this.pointsList(0, props.players.length)
			}],
			data			: {
				players		: null,
				history		: null
			}
		};

		this.startTimer();
	}

	genPlayers (players) {
		return players.map((playerName, i) => new Player(playerName, i));
	}

	resetNextPoints () {
		this.setState({
			nextPoints: this.pointsList(''),
			loadingPoints: false
		});
	}

	pointsList (val, playersQuantity) {
		const points = [];

		playersQuantity = playersQuantity || this.state.playersQuantity;

		for(let i = 0; i < playersQuantity; i++) {
			points[i] = val;
		}

		 return points;
	}

	reStartTimer () {
		let { elapsedTime } = this.state;

		this.setState({
			elapsedTime,
			fastForward: true
		});

		const animationTime = 3;
		const intervalDelay = 10;
		const steps = animationTime * 1000 / intervalDelay; // tengo 300 pasos
		const stepSize = Math.ceil(elapsedTime / steps);

		const interval = setInterval(() => {
			elapsedTime -= stepSize;

			if(elapsedTime < 0) elapsedTime = 0;

			this.setState({ elapsedTime });

			if(elapsedTime == 0) {
				clearInterval(interval);
				this.startTimer();
				this.setState({
					fastForward: false
				});
			}
		}, intervalDelay);
	}

	startTimer () {
		this.stopTimer();

		this.timerInterval = setInterval(this.updateTime.bind(this), 1000);
	}

	stopTimer () {
		clearInterval(this.timerInterval);
		this.timerInterval = 0;
	}

	timerState () {
		return this.timerInterval ? 'on' : 'off';
	}

	updateTime () {
		this.setState({
			elapsedTime: this.state.elapsedTime + 1
		});
	}

	checkLoadingPoints () {
		const anyPoint = this.state.nextPoints.some(
			point => point.match(/^[0-9]+$/)
		);

		this.setState({
			loadingPoints: anyPoint
		});

		if(anyPoint) {
			this.onLoadingPoints();
		} else {
			this.onLoadFinished();
		}
	}

	onLoadingPoints () {
		this.setState({
			timerPaused: false
		});

		this.stopTimer();
	}

	onLoadFinished () {
		this.startTimer();
	}

	playersPoints () {
		const points = this.state.players.map((p, index) => (
			<div className="col">

				{/* Player points */}
				{this.state.history.slice(1).map(round => <div className="cell"><span className="animated flash">{round.points[index]}</span></div>)}

				{/* Input for new points */}
				<div className="cell points-loader">
					<input type="number" key={index} value={this.state.nextPoints[index]} onChange={this.changePoints.bind(this)} data-index={index} />
				</div>

				{/* Next cell */}
				{this.state.loadingPoints && <div className="cell">&nbsp;</div>}
			</div>
		));

		return <div className="body">{points}</div>;
	}

	timings () {
		return (
			<div className="timer">
				{this.state.history.slice(1).map((round, i) => <div className="row animated bounceInLeft" key={'timer-'+i}><span>{this.minimalTime(round.time)}</span></div>)}
			</div>
		);
	}

	minimalTime (seconds) {
		return `${Math.floor(seconds / 60)}'${seconds % 60}''`;
	}

	changePoints (event) {
		const input = event.target;
		const index = input.getAttribute('data-index');
		const prevPoints = this.state.nextPoints;
		const newPoints = input.value;

		prevPoints[index] = newPoints;

		this.setState({
			nextPoints: prevPoints
		});

		this.checkLoadingPoints();
	}

	playersHeader () {
		const players = this.state.players.map(player => (
			<div className="col">
				<div className="cell">
					<span>
						{player.isHand && <i className="fa fa-hand-paper-o"></i>}
						{player.name.substring(0, 2)}.
						{player.wons != 0 && (
							<i className={"fa fa-" + (player.isWinning ? 'star' : 'circle')}><span className="number">{player.wons}</span></i>
						)}
					</span>
				</div>
			</div>
		));

		return <div className="header">{players}</div>;
	}

	validPoints () {
		const newPoints = this.state.nextPoints;
		const errors = [];

		let valid = true;
		let winner;

		if(newPoints.length != this.state.players.length) {
			valid = false;
			errors.push('¡Faltan puntajes!');
		}

		newPoints.forEach((points) => {
			if( ! points.match(/^[0-9]+$/)) {
				errors.push('Los puntajes deben ser valores númericos');
				valid = false;
			} else if(points === '0') {
				winner = true;
			}
		});

		if( !winner ) {
			valid = false;
			errors.push('Debe haber algún ganador de la ronda')
		}

		return { valid, errors };
	}

	savePoints () {
		const validatedPoints = this.validPoints();

		if(validatedPoints.valid) {
			const points = this.state.nextPoints;

			this.updateHistory(points);
			this.updatePlayers(points);
			this.resetNextPoints();
			this.reStartTimer();			
			this.checkWinner();
		} else {
			this.setState({
				errorMessage : {
					message	: validatedPoints.errors,
					icon	: 'exclamation'
				}
			});
		}
	}

	checkWinner () {
		let endedGame;
		let winner;

		this.state.players.forEach(player => {
			if(player.isWinning) {
				winner = player;
			}
			if(player.points >= 500) {
				endedGame = true;
			}
		});

		if(endedGame && winner) {
			const { players, history } = this.state;

			this.props.onGameEnd({
				players,
				history,
				winner
			});
		}
	}

	updateHistory (points) {
		const { elapsedTime, history } = this.state;
		const previousHistory = history[history.length - 1];
		const newPoints = previousHistory.points.map((prevPoints, i) => prevPoints + parseInt(points[i]));

		this.setState({
			history : history.concat([{
				points: newPoints,
				time: elapsedTime
			}])
		});
	}

	updatePlayers (points) {
		let winningPlayer;

		const updateWinner = (player) => {
			if( ! winningPlayer || player.points < winningPlayer.points ) {
				if (winningPlayer) {
					winningPlayer.updateWinning(false);
				}
				player.updateWinning(true);
				winningPlayer = player;
			} else if(player.points == winningPlayer.points) {
				winningPlayer.updateWinning(false);
			}
		}

		let nextPlayerHand;

		const updateHand = (player) => {
			if(player.isHand) {
				player.updateHand(false);
				nextPlayerHand = (player.index + 1) % this.state.players.length;
			}
		}

		// Gets players updated
		const players = this.state.players.map((player, i) => {
			const playerRoundPoints = points[i];

			// Makes updates
			player.updatePoints(playerRoundPoints);
			player.updateWons(playerRoundPoints);
			player.updateWinning(false);
			
			// Updates hand and winner
			updateHand(player);
			updateWinner(player);

			return player;
		});

		// Updates current hand player
		players[nextPlayerHand].updateHand(true);

		// Updates state
		this.setState({ players });
	}

	handleLoad (event) {
		if ( this.state.loadingPoints ) {
			this.savePoints();
		} else {
			const timerPaused = this.timerState() == 'on';

			if(timerPaused) {
				this.stopTimer();
			} else {
				this.startTimer();
			}

			this.setState({ timerPaused });
		}
	}

	removeError () {
		this.setState({
			errorMessage: null
		});
	}

	errorShow (event) {
		const { message, icon } = event.target.dataset;

		const errorMessage = { message, icon };

		this.setState({ errorMessage });
	}

	render () {
		return (
			<div className={"step notepad" + (this.state.loadingPoints ? ' loading' : '') + (this.state.timerPaused ? ' timer-paused' : '') + (this.state.loadingPoints && this.validPoints().valid ? ' loaded' : '')}>
				
				<Clock elapsedTime={this.state.elapsedTime} onClick={this.handleLoad.bind(this)} loadingPoints={this.state.loadingPoints} fastForward={this.state.fastForward} timerPaused={this.state.timerPaused} />

				<div id="results" className="box animated zoomIn">
					{this.playersHeader()}
					{this.playersPoints()}
				</div>

				<div id="buttons" className="box animated fadeInUp">
					<div className="button" onClick={this.errorShow.bind(this)} data-message="Próximamente estará la tabla" data-icon="bar-chart"><i className="fa fa-history"></i>Ver historial</div>
					<div className="button" onClick={this.errorShow.bind(this)} data-message="¡Próximamente!" data-icon="hand-pointer-o"><i className="fa fa-cogs"></i>Configuración</div>
				</div>

				<Errors errorMessage={this.state.errorMessage} onErrorClose={this.removeError.bind(this)} />

			</div>
		);
	}
}

export default NotePad;
