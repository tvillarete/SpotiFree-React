import React, { Component } from 'react';
import { Play, Pause, FastForward } from 'react-feather';
import MiniControls from './MiniControls';
import PlaybackControls from './PlaybackControls';

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
