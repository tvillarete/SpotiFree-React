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
        return(
            <div className={`mini-controls ${this.props.fullscreen ? 'fullscreen' : ''}`}
             onClick={() => {this.handleEvent({type: 'fullscreen'})}}>
                <div className="info-container">
                    <div className="artwork"
                        style={{backgroundImage: `url("${this.props.track.meta.artwork}")`}}></div>
                    <div className="song-title">
                        <h3>{this.props.track.meta.name}</h3>
                    </div>
                </div>
                <div className="button-container">
                    <Play onClick={this.play}
                        className={this.props.isPlaying ? 'hidden' : ''} />
                    <Pause onClick={this.pause}
                     className={this.props.isPlaying ? '' : 'hidden'} />
                    <FastForward
                     onClick={this.skip} />

                </div>
            </div>
        );
    }
}
