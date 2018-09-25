
import React, { Component } from 'react';

import { MyContext } from '../context';
import { ShoutoutList } from '../styles';

import User from './User';
import Shoutout from './Shoutout';

export default ({ match }) => (
    <div className="profile">
        <User userId={match.params.userId}/>
        <ShoutoutList profile={true}>
            <MyContext.Consumer>
                {({ state }) => {
                    return state.shoutouts
                        // .filter(s => s.giverId == state.userId)
                        .map(s => <Shoutout shoutout={s} />)
                }}
            </MyContext.Consumer>
        </ShoutoutList>
    </div>
);
