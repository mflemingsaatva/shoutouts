
import React from 'react';
import { Link } from 'react-router-dom';

import { MyContext } from '../context';
import { Nav } from '../styles';

export default ({ match }) => (
	<Nav>
		<Link to="/" className={match.isExact && 'active'}>Shoutouts!</Link>
		<MyContext.Consumer>
			{({ state, update }) => (
				<Link
					className={!match.isExact && 'active'}
					to={`/u/${state.activeUserId}`}
					onClick={() => update.user(state.activeUserId)}
				>
					Your Profile
				</Link>
			)}
		</MyContext.Consumer>
		<a href="/logout" className="logout">Logout</a>
	</Nav>
);
