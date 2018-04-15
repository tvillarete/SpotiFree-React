import React, { Component } from 'react';
import OptionsButton from './OptionsButton';

export default class TrackButton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleMainEvent = this.handleMainEvent.bind(this);
    }

    handleEvent = options => {
        this.props.onEvent(options);
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
            <div className={`nav-button ${this.props.subtext ? 'with-subtext' : ''} ${this.props.color} ${this.props.currentTrack ? 'current-track' : ''} ${this.props.isPlaying ? 'playing' : ''}`}
             onClick={this.handleMainEvent}>
                {this.props.img
                    ? <img alt="Artwork" className="artwork" src={this.props.img} />
                    : ''}
                <div className="left-container">
                    <div className="text-container">
                        <h3 className="text">{this.props.text}</h3>
                        {this.props.subtext
                            ? <h4 className="subtext">{this.props.subtext}</h4>
                            : '' }
                    </div>
                </div>
                <div className="right-container">
                    <OptionsButton {...this.props} onEvent={this.handleEvent} />
                </div>
            </div>
        );
    }
}
