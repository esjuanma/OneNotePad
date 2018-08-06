import React from 'react';

class Errors extends React.Component {

	constructor(props) {
		super(props);

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
		const { errorMessage } = this.props;

		return errorMessage
			? (
				<div className="modal-container" onClick={this.props.onErrorClose}>
					<div className="modal animated flipInX">
						<span>
							{errorMessage.icon && <i className={"fa fa-" + errorMessage.icon}></i>}
							{this.parsedMessage(errorMessage)}
						</span>
					</div>
				</div>
			)
			: <span></span>;
	}
}

export default Errors;
