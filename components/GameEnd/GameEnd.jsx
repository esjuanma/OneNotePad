import React from 'react';
import Errors from '../Errors/Errors.jsx';

class GameEnd extends React.Component {

	constructor(props) {
		super(props)

		this.state = {};
	}

	resetGame () {
		// to-do
	}

	playAnother () {
		// to-do
	}

	errorShow (event) {
		const { message, icon } = event.target.dataset;

		const errorMessage = { message, icon }

		this.setState({ errorMessage });
	}

	removeError () {
		this.setState({
			errorMessage: null
		});
	}

	render () {

		return (

			<div className="step end">

				<div className="star animated flip"><i className="fa fa-star"></i><i className="fa fa-star hover"></i></div>
				<div className="winner animated zoomInUp">¡Ganó {this.props.winner}!</div>
				<div className="actions animated fadeIn">
					<span onClick={this.errorShow.bind(this)} data-message="Oops!" data-icon="hand-pointer-o">Desempatar</span>
					-
					<span onClick={this.errorShow.bind(this)} data-message="Oops!" data-icon="hand-pointer-o">Jugar otra partida</span>
				</div>

				<Errors errorMessage={this.state.errorMessage} onErrorClose={this.removeError.bind(this)} />
			</div>
		);
	}
}

export default GameEnd;
