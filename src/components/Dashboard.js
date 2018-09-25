
import React, { Component } from 'react';

import { MyContext } from '../context';
import { ShoutoutList } from '../styles';

import Shoutout from './Shoutout';

export default () => (
    <ShoutoutList className="dashboard">
        <MyContext.Consumer>
            {({ state }) => {
                return state.shoutouts.map(s => <Shoutout shoutout={s} />)
            }}
        </MyContext.Consumer>
    </ShoutoutList>
);