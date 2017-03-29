import React from 'react';

class GameEnd extends React.Component {

	constructor(props) {
		
		super(props)

		this.state = {};
	}

	resetGame () {

	}

	playAnother () {
		
	}

	render () {

		return (

			<div className="step end">
				<div className="star animated flip"><i className="fa fa-star"></i><i className="fa fa-star hover"></i></div>
				<div className="winner animated zoomInUp">¡Ganó {this.props.winner}!</div>
				<div className="actions animated fadeIn"><span>Desempatar</span> - <span>Jugar otra partida</span></div>
			</div>
		);
	}
}

export default GameEnd;