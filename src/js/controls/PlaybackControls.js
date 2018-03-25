import React, { Component } from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class PlaybackControls extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const meta = this.props.track.meta;
        console.log(this.props.track.currentTime/this.props.track.duration*100);
        return(
            <div className="playback-controls">
                <div className="artwork-container">
                    <img alt={meta.name} src={meta.artwork} />
                </div>
                <h3>{meta.name}</h3>
                <Slider value={Math.floor(this.props.track.currentTime/100)*100} />
            </div>
        );
    }
}
