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

		const time = this.props.elapsedTime;
		const minutes = spanned(zeroFormat(Math.floor(time / 60)));
		const seconds = spanned(zeroFormat(time % 60));
		
		return { minutes , seconds };
	}

	flipClock (event) {
		event.stopPropagation();

		if(this.props.timerPaused || this.props.loadingPoints) return;

		this.setState({
			clockwise: !this.state.clockwise
		});
	}

	render () {
		const time = this.parsedElapsedTime();

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
