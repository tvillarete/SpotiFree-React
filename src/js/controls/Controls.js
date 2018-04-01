import React, { Component } from 'react';
import { Play, Pause, FastForward } from 'react-feather';
import MiniControls from './MiniControls';
import PlaybackControls from './PlaybackControls';

export default class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullscreen: false,
            track: props.track,
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

    changeTime = (options) => {
        if (this.state.track.src) {
            this.setState(state => {
                state.track.currentTime = options.value;
                return state;
            });
        }
    }

    updateTime = (timestamp) => {
        const convertedTimestamp = this.convertTime(Math.floor(timestamp));

        this.setState(state => {
            if (state.track.currentTime >= state.track.duration) {
                this.handleEvent({type: 'skip'})
                state.isPlaying = state.track.index <= state.track.playlist.length-1;
            }
            state.track.currentTime = timestamp;
            state.track.convertedCurrentTime = convertedTimestamp;
            return state;
        });
    }

    convertTime = (timestamp) => {
        let minutes = Math.floor(timestamp / 60);
        let seconds = timestamp - (minutes * 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return (minutes + ':' + seconds);
    }

    render() {
        const {
            track,
            fullscreen
        } = this.state;

        return (
            <div className={`controls ${this.state.fullscreen ? 'fullscreen' : ''}`}>
                <MiniControls {...this.props}
                    track={track}
                    fullscreen={fullscreen}
                    onEvent={this.handleEvent}/>
                    {this.state.fullscreen ? <PlaybackControls {...this.props} /> : ''}
            </div>
        );
    }
}
