import React, { Component } from 'react';

export default class TrackButton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleMainEvent = this.handleMainEvent.bind(this);
    }

    handleMainEvent() {
        this.props.onEvent({
            type: 'play-new',
            value: {
                name: this.props.name,
                artist: this.props.artist,
                album: this.props.album,
                track: this.props.track,
                url: this.props.url,
                artwork: this.props.artwork,
            }
        });
    }

    render() {
        return (
            <div className={`track-button ${this.props.subtext ? 'with-subtext' : ''}`}
             onClick={this.handleMainEvent}>
                <h3 className="text">{this.props.name}</h3>
            </div>
        );
    }
}
