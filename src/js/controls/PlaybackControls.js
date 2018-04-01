import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

export default class PlaybackControls extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleEvent = (options) => {
        this.props.onEvent(options);
    }


    render() {
        const meta = this.props.track.meta;
        let currentTime = this.props.track.currentTime || 0;
        let duration = this.props.track.duration || 1;
        //console.log(this.props.track);
        return(
            <div className="playback-controls">
                <div className="artwork-container">
                    <img alt={meta.name} src={meta.artwork} />
                </div>
                <h3>{meta.name}</h3>
                <TrackTimeSlider
                    min={0}
                    max={this.props.track.duration}
                    value={Math.floor(this.props.track.currentTime)}
                    onEvent={this.handleEvent}
                    />
            </div>
        );
    }
}

class TrackTimeSlider extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.value,
            isChanging: false,
        }
    }

    handleOnChange = value => {
        this.setState({ value: value })
        this.props.onEvent({
            type: 'time',
            value: value,
        });
    }

    componentDidUpdate() {
        if (this.props.value != this.state.value) {
            this.setState({ value: this.props.value });
        }
    }

    render() {
        return (
            <Slider
                {...this.props}
                value={this.props.value}
                className="time-slider"
                onChange={this.handleOnChange}
            />
        );
    }
}
