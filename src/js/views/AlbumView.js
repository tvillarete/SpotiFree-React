import React, { Component } from 'react';
import TrackButton from './components/TrackButton';

export default class AlbumView extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
        }
        this.handleEvent = this.handleEvent.bind(this);
        this.renderTrackButtons = this.renderTrackButtons.bind(this);
        this.fetchTracks = this.fetchTracks.bind(this);
    }

    // Passes event to SpotiFree.js
    handleEvent(options) {
        this.props.onEvent(options);
    }

    fetchTracks() {
        fetch(`http://tannerv.ddns.net:3000/api/album/${this.props.album}`)
            .then(response => {
                response.json().then((data) => {
                    this.setState({
                        data: data,
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
        this.fetchTracks();
    }

    render() {
        if (!this.state.data) {
            return <h3>Loading...</h3>;
        }
        return (
            <div className="view album-view">
                <h1>{this.props.album}</h1>
                {this.renderTrackButtons()}
            </div>
        );
    }
}
