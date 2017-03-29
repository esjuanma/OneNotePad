import React from 'react';

class Clock extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			clockwise : 0
		}
	}

	parsedElapsedTime () {

		const zeroFormat = t => t >= 10 ? `${t}` :  `0${t}`;

		const spanned = t => (
			<span>
				<span className="number">{t[0]}</span>
				<span className="number">{t[1]}</span>
			</span>
		);

		let time = this.props.elapsedTime;
		let minutes = spanned(zeroFormat(Math.floor(time / 60)));
		let seconds = spanned(zeroFormat(time % 60));
		
		return { minutes , seconds };
	}

	flipClock (event) {

		if(this.props.timerPaused || this.props.loadingPoints) return;

		event.stopPropagation();

		this.setState({
			clockwise : !this.state.clockwise
		});
	}

	render () {

		let time = this.parsedElapsedTime();

		return (
			<div id="clock" className={"animated zoomInUp" + (this.props.fastForward ? ' fast-forward' : '') + (this.props.timerPaused ? ' timer-paused' : '')} onClick={this.props.onClick}>
				
				<span className="sand-clock"><i className="fa fa-hourglass-start"></i></span>
				
				<span className="time">
					{time.minutes}<span className="dots">:</span>{time.seconds}
				</span>
				
				<span
					className={"round-sense" + (this.state.clockwise ? " clockwise" : "")}
					onClick={this.flipClock.bind(this)}>
						<i className="fa fa-refresh"></i>
				</span>

			</div>
		);
	}
}

export default Clock;