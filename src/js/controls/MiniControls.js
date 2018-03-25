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
                    <Play onClick={(e)=>{
                        e.stopPropagation();
                        this.handleEvent({type: 'play'})}
                    }
                     className={this.props.isPlaying ? 'hidden' : ''} />
                    <Pause onClick={(e)=>{
                        e.stopPropagation();
                        this.handleEvent({type: 'pause'})}
                    }
                     className={this.props.isPlaying ? '' : 'hidden'} />
                    <FastForward
                     onClick={(e)=>{
                         e.stopPropagation()
                         this.handleEvent({type: 'skip'})}
                     } />

                </div>
            </div>
        );
    }
}
