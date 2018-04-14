import React, { Component } from 'react';

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
        if (!this.props.data.isOpen) {
            this.props.onEvent({
                type: 'controls',
                value: true
            });
        }
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
        const classNames = `${this.props.data.isOpen ? 'fullscreen' : ''} ${this.props.isPlaying ? 'playing' : ''} ${this.props.data.isClosing ? 'closing' : ''}`;
        const url = "files/images";

        return(
            <div className={`mini-controls ${classNames}`}
             onClick={this.toggleFullscreen}>
                <div className="artwork-container">
                    <img alt="artwork" className="artwork"
                        src={this.props.track.meta.artwork}/>
                </div>
                <div className="info-container">
                    <h3 className="song-name">{this.props.track.meta.name}</h3>
                    <div className="button-container">
                        <img alt="play" src={`${url}/play.svg`} onClick={this.play}
                            className={`play ${this.props.isPlaying ? 'hidden' : ''}`} />
                        <img alt="pause" src={`${url}/pause.svg`} onClick={this.pause}
                            className={`pause ${this.props.isPlaying ? '' : 'hidden'}`} />
                        <img className="skip" alt="skip" src={`${url}/skip_next.svg`}
                         onClick={this.skip} />
                    </div>
                </div>
            </div>
        );
    }
}
