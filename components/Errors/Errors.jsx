import React from 'react';

class Errors extends React.Component {

	constructor(props) {

		super(props);

		console.log('props', props)

		this.state = {
			errorMessage : props.errorMessage
		};
	}

	parsedMessage (errorMessage) {

		if(typeof errorMessage.message == 'string') {
			return errorMessage.message;
		} else {
			return errorMessage.message.map(message => <span>{message}</span>);
		}
	}

	render () {

		let errorMessage = this.props.errorMessage;

		if( errorMessage ) {

			return (
				<div className="modal-container" onClick={this.props.onErrorClose}>
					<div className="modal animated flipInX">
						<span>
							{errorMessage.icon && <i className={"fa fa-" + errorMessage.icon}></i>}
							{this.parsedMessage(errorMessage)}
						</span>
					</div>
				</div>
			);

		} else {

			return <span></span>;
		}
	}
}

export default Errors;