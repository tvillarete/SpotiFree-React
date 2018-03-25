import React, { Component } from 'react';
import { Play, Pause, FastForward } from 'react-feather';
import MiniControls from './MiniControls';

export default class Controls extends Component {
    constructor() {
        super();
        this.state = {
            fullscreen: false,
        }
        this.handleEvent = this.handleEvent.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
    }

    // Event passed to SpotiFree.js
    handleEvent(options) {
        if (options.type === 'fullscreen') {
            this.toggleFullscreen();
        } else {
            this.props.onEvent(options);
        }
    }

    toggleFullscreen() {
        this.setState(state => {
            state.fullscreen = !state.fullscreen;
            return state;
        })
    }

    render() {
        return (
            <div className={`controls ${this.state.fullscreen ? 'fullscreen' : ''}`}>
                <MiniControls {...this.props}
                 fullscreen={this.state.fullscreen}
                 onEvent={this.handleEvent}/>
                 {this.state.fullscreen ? <PlaybackControls {...this.props} /> : ''}
            </div>
        );
    }
}

class PlaybackControls extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const meta = this.props.track.meta;
        console.log(this.props.track.playlist);
        return(
            <div className="playback-controls">
                <div className="artwork-container">
                    <img alt={meta.name} src={meta.artwork} />
                </div>
                <h3>{meta.name}</h3>
            </div>
        );
    }
}
