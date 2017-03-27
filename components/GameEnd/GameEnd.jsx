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
				<div className="star animated flip"><i className="fa fa-star"></i></div>
				<div className="winner animated zoomInUp">¡Ganó {this.props.winner}!</div>
			</div>
		);
	}
}

export default GameEnd;