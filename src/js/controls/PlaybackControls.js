import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class PlaybackControls extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const meta = this.props.track.meta;
        let currentTime = this.props.track.currentTime || 0;
        let duration = this.props.track.duration || 1;
        return(
            <div className="playback-controls">
                <div className="artwork-container">
                    <img alt={meta.name} src={meta.artwork} />
                </div>
                <h3>{meta.name}</h3>
                <Slider value={Math.floor(currentTime/duration)*100} />
            </div>
        );
    }
}
