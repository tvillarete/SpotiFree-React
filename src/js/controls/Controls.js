import React, { Component } from 'react';
import MiniControls from './MiniControls';
import PlaybackControls from './PlaybackControls';

export default class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullscreen: false,
            track: props.track,
        }
    }

    // Event passed to SpotiFree.js
    handleEvent = (options) => {
        this.props.onEvent(options);
    }

    toggleFullscreen = () => {
        this.props.onEvent({
            type: 'controls',
            value: !this.props.data.isOpen
        });
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

        const classNames = `${this.props.data.isOpen ? 'fullscreen' : ''} ${this.props.data.isClosing ? 'closing' : ''}`;

        return (
            <div className={`controls ${classNames}`}>
                <div className="chevron-container" onClick={this.toggleFullscreen}>
                    <img alt="close" className="chevron-wide" src="files/images/chevron_wide.svg" />
                </div>
                <MiniControls {...this.props}
                    track={track}
                    fullscreen={fullscreen}
                    onEvent={this.handleEvent}/>
                <PlaybackControls {...this.props} />
            </div>
        );
    }
}
