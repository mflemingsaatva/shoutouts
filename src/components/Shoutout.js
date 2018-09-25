
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { MyContext } from '../context';

export default class Shoutout extends Component {
    constructor (props) {
        super(props);
        this.state = {
            url: '',
        }
    }

    componentWillMount () {
        axios.get(`/api/read?text=${this.props.shoutout.message}`)
            .then(res => res.data)
            .then(({ data }) => this.setState({ url: data }))
            .catch(console.log);
    }

    render () {
        console.log(this.state)
        return (
            <div className="shoutout-list__card">
                <p>
                    <MyContext.Consumer>
                        {({ update }) => (
                            <Link
                                to={`/u/${this.props.shoutout.giverId}`}
                                onClick={() => update.user(this.props.shoutout.giverId)}
                            >
                                {this.props.shoutout.giver}
                            </Link>
                        )}
                    </MyContext.Consumer>
                    &nbsp;shouts out to {this.props.shoutout.getter}:
                </p>
                <p>"{this.props.shoutout.message}"</p>
                {
                    this.state.url == ''
                        ? null
                        : (
                            <audio controls>
                                <source src={`/${this.state.url}`} type="audio/mp3"/>
                            </audio>
                        )
                }
            </div>
        );
    }
}
