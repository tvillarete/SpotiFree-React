import React, { Component } from 'react';
import { Play, Pause, FastForward } from 'react-feather';

export default class MiniControls extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleEvent = this.handleEvent.bind(this);
    }

    // Action passed to Controls class
    handleEvent(options) {
        this.props.onEvent(options);
    }

    toggleFullscreen = () => {
        this.props.onEvent({
            type: 'controls',
            value: !this.props.data.isOpen
        });
    }

    play = (e) => {
        if (e) e.stopPropagation();
        this.handleEvent({type: 'play'});
    }

    pause = (e) => {
        if (e) e.stopPropagation();
        this.handleEvent({type: 'pause'});
    }

    skip = (e) => {
        if (e) e.stopPropagation();
        this.handleEvent({type: 'skip'});
    }

    render() {
        const classNames = `${this.props.data.isOpen ? 'fullscreen' : ''} ${this.props.data.isClosing ? 'closing' : ''}`;

        return(
            <div className={`mini-controls ${classNames}`}
             onClick={this.toggleFullscreen}>
                <div className="artwork-container">
                    <img className="artwork"
                        src={this.props.track.meta.artwork}/>
                </div>
                <div className="info-container">
                    <h3 className="song-name">{this.props.track.meta.name}</h3>
                    <div className="button-container">
                        <Play onClick={this.play}
                            className={this.props.isPlaying ? 'hidden' : ''} />
                        <Pause onClick={this.pause}
                         className={this.props.isPlaying ? '' : 'hidden'} />
                        <FastForward
                         onClick={this.skip} />
                    </div>
                </div>
            </div>
        );
    }
}
