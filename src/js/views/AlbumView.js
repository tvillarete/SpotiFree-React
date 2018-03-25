import React, { Component } from 'react';
import TrackButton from './components/TrackButton';
import Header from '../Header';

export default class AlbumView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data.memoized,
        }
        this.handleEvent = this.handleEvent.bind(this);
        this.renderTrackButtons = this.renderTrackButtons.bind(this);
        this.fetchTracks = this.fetchTracks.bind(this);
    }

    // Passes event to SpotiFree.js
    handleEvent(options) {
        if (options.type === 'play-new') {
            let index = 0;
            const data = this.state.data;
            for (let track in data) {
                const trackData = data[track];
                if (trackData.name === options.value.name) {
                    index = parseInt(track);
                }
            }
            Object.assign(options, {
                playlist: this.state.data,
                index: index,
            });
        }
        this.props.onEvent(options);
    }

    fetchTracks() {
        fetch(`http://tannerv.ddns.net:3000/api/album/${this.props.album}`)
            .then(response => {
                response.json().then((data) => {
                    this.setState({
                        data: data,
                    });
                    this.handleEvent({
                        type: 'memoize',
                        memoized: data,
                    });
                });
            });
    }

    renderTrackButtons() {
        let trackButtons = [];

        this.state.data.forEach(data => {
            trackButtons.push(
                <TrackButton
                 key={data.track}
                 name={data.name}
                 artist={data.artist}
                 album={data.album}
                 track={data.track}
                 url={data.url}
                 artwork={data.artwork}
                 onEvent={this.handleEvent}/>
            );
        });
        return trackButtons;
    }

    componentWillMount() {
        if (!this.state.data) {
            this.fetchTracks();
        }
    }

    render() {
        return (
            <div className="view album-view">
                <Header
                 text={this.props.album}
                 backText="Albums"
                 onEvent={this.handleEvent}/>
                <AlbumHeader
                 title={this.props.album}
                 artist={this.props.artist}
                 artwork={this.props.artwork}/>
                {this.state.data ? this.renderTrackButtons() : <h3>Loading</h3>}
            </div>
        );
    }
}

class AlbumHeader extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return(
            <div className="album-header">
                <img alt={this.props.title} src={this.props.artwork} />
                <h3>{this.props.title}</h3>
            </div>
        );
    }
}
