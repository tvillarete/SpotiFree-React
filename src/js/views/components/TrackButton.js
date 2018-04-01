import React, { Component } from 'react';

export default class TrackButton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleMainEvent = this.handleMainEvent.bind(this);
    }

    handleMainEvent() {
        const meta = this.props.meta;
        this.props.onEvent({
            type: 'play-new',
            value: meta,
        });
    }

    render() {
        return (
            <div className={`track-button ${this.props.currentTrack ? 'current-track' : ''} ${this.props.isPlaying ? 'playing' : ''} ${this.props.subtext ? 'with-subtext' : ''}`}
             onClick={this.handleMainEvent}>
                <h3 className="text">{this.props.meta.name}</h3>
            </div>
        );
    }
}
