
import React from 'react';
import { Link } from 'react-router-dom';

import { MyContext } from '../context';

// add onclick here that updates user

export default ({ shoutout }) => (
    <div className="shoutout-list__card">
        <p>
            <MyContext.Consumer>
                {({ update }) => (
                    <Link
                        to={`/u/${shoutout.giverId}`}
                        onClick={() => update.user(shoutout.giverId)}
                    >
                        {shoutout.giver}
                    </Link>
                )}
            </MyContext.Consumer>
            &nbsp;shouts out to {shoutout.getter}:
        </p>
        <p>"{shoutout.message}"</p>
    </div>
);
