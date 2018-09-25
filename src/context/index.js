
import React, { Component } from 'react';
import axios from 'axios';

// first make a new context
export const MyContext = React.createContext();

// then create a provider component
export class MyProvider extends Component {
	constructor (props) {
		super();
		this.state = {
			activeUserId: '',
			userName: '',
			userId: '',
			userStatusText: '',
			teamId: '',
			avatarUrl: '',
			shoutouts: [],
		}
    }
    
    componentWillMount () {
		this.setState({
			// userName: window.stateData.userName,
			activeUserId: window.stateData.userId,
			teamId: window.stateData.teamId,
		});
	}

	componentDidMount () {
		axios.get('/api/shoutouts')
			.then(res => res.data)
			.then(({ data }) => {
				console.log('response from /api/shoutouts', data);
				this.setState({ shoutouts: data });
			});
	}

	updateUser (userId) {
		axios.get(`/api/users/${userId}`)
			.then(({ data }) => {
				console.log(data)
				this.setState({
                    userStatusText: data.data.user.profile.status_text,
                    avatarUrl: data.data.user.profile.image_original,
                    userName: data.data.user.profile.real_name
                });
			})
			.catch(err => console.log(err));
	}

	resetUser () {
		this.setState({
			userName: '',
			userId: '',
			userStatusText: '',
			avatarUrl: '',
		});
	}

	render () {
		return (
			<MyContext.Provider value={{
				state: this.state,
				update: { user: this.updateUser.bind(this) },
				reset: { user: this.resetUser.bind(this) },
			}}>
				{this.props.children}
			</MyContext.Provider>
		);
	}
}
