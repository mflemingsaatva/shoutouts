
import React, { Component } from 'react';

import { MyContext } from '../context';

import { UserProfile } from '../styles';

class User extends Component {
    componentWillMount () {
        this.props.context.reset.user();
    }

    componentDidUpdate () {
        window.scrollTo(0, 0);
    }

    render () {
        return (
            <UserProfile>
                <MyContext.Consumer>
                    {({ state }) => (
                        <React.Fragment>
                            {console.log(state)}
                            <img src={state.avatarUrl}/>
                            <h1>{state.userName}</h1>
                            <h3>{state.userStatusText}</h3>
                        </React.Fragment>
                    )}
                </MyContext.Consumer>
            </UserProfile>
        );
    }
}

export default React.forwardRef((props, ref) => (
    <MyContext.Consumer>
        {ctx => <User ref={ref} context={ctx}/>}
    </MyContext.Consumer>
));
