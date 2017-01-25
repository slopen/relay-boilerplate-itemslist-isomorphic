import React, {Component} from 'react';
import Relay from 'react-relay';

import Header from 'components/content/header';

class App extends Component {
	render () {
		const {routes, children, viewer} = this.props;

		return (
			<div>
				<Header routes={routes} viewer={viewer}/>

				<div id="content" className="content container">
					{children}
				</div>
			</div>
		);
	}
}

export default Relay.createContainer (App, {

	fragments: {
		viewer: () => Relay.QL`
			fragment on User {

				${Header.getFragment ('viewer')}

			}
		`
	}
});
