import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import OptionsButton from '../views/components/OptionsButton';
import 'react-rangeslider/lib/index.css';

export default class PlaybackControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupOpen: false,
        }
    }

    handleEvent = (options) => {
        this.props.onEvent(options);
    }

    render() {
        return(
            <div className={`playback-controls ${this.props.isPlaying ? 'playing' : ''}`}>
                 <TrackTimeSlider
                    min={0}
                    max={this.props.track.duration}
                    value={Math.floor(this.props.track.currentTime)}
                    tooltip={false}
                    onEvent={this.handleEvent}
                    />
                <Metadata {...this.props}/>
                <PlaybackButtons {...this.props}
                    onEvent={this.handleEvent}/>
                <VolumeSlider {...this.props}
                    min={0}
                    max={100}
                    value={this.props.track.volume}
                    tooltip={false}
                    onEvent={this.handleEvent}/>
                <OptionsButton {...this.props}
                    onEvent={this.handleEvent}/>
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

    convertTime = (timestamp) => {
        const minutes = Math.floor(timestamp/60);
        const seconds = timestamp - minutes * 60;
        return `${minutes < 10 ? 0 : ''}${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
    }

    componentDidUpdate() {
        if (this.props.value !== this.state.value) {
            this.setState({ value: this.props.value });
        }
    }

    render() {
        return (
            <div className="track-time-slider-container">
                <Slider
                    {...this.props}
                    value={this.props.value}
                    className="time-slider"
                    onChange={this.handleOnChange}
                />
                <div className="time-container">
                    <div>{this.convertTime(this.props.value)}</div>
                    <div>-{this.convertTime(this.props.max)}</div>
                </div>
            </div>
        );
    }
}

class Metadata extends Component {
    render() {
        const meta = this.props.track.meta;

        return (
            <div className="track-metadata-container">
                <h3 className="track-title">{meta.name}</h3>
                <h3 className="track-album">{meta.artist} &mdash; {meta.album}</h3>
            </div>
        );
    }
}

class PlaybackButtons extends Component {
    previous = () => {
        this.props.onEvent({
            type: 'previous',
        });
    }

    play = () => {
        this.props.onEvent({
            type: 'play',
        });
    }

    pause = () => {
        this.props.onEvent({
            type: 'pause',
        });
    }

    skip = () => {
        this.props.onEvent({
            type: 'skip',
        });
    }

    render() {
        const url = "files/images";

        return (
            <div className="playback-button-container">
                <img alt="previous" className="previous"
                    onClick={this.previous} src={`${url}/skip_next.svg`}/>
                <img alt="play" className={`play ${this.props.isPlaying ? 'hidden' : ''}`}
                    onClick={this.play} src={`${url}/play.svg`}/>
                <img alt="pause" className={`pause ${this.props.isPlaying ? '' : 'hidden'}`}
                    onClick={this.pause} src={`${url}/pause.svg`}/>
                <img alt="skip" className="skip"
                    onClick={this.skip} src={`${url}/skip_next.svg`}/>
            </div>
        );
    }
}

class VolumeSlider extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.value,
        }
    }

    handleOnChange = value => {
        this.setState({ value: value })
        this.props.onEvent({
            type: 'volume',
            value: value,
        });
    }

    render() {
        return (
            <div className="volume-slider-container">
                <Slider
                    {...this.props}
                    value={this.props.value}
                    className="volume-slider"
                    onChange={this.handleOnChange}
                />
            </div>
        );
    }
}
