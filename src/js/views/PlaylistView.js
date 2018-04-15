import React, { Component } from 'react';
import TrackButton from './components/TrackButton';
import Header from '../Header';

export default class PlaylistView extends Component {
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
                    index = parseInt(track, 10);
                }
            }
            Object.assign(options, {
                playlist: this.state.data,
                index: index,
            });
        }
        this.props.onEvent(options);
    }

    handleResize = () => {
        this.setState(state => {
            state.isMobile = window.innerWidth < 750;
            return state;
        });
    }

    fetchTracks() {
        const playlists = JSON.parse(localStorage.playlists);
        const thisPlaylist = playlists[this.props.data.playlist];
        const tracks = thisPlaylist.tracks;

        this.setState({ data: tracks });
    }

    renderTrackButtons() {
        let trackButtons = [];

        this.state.data.forEach((data, index) => {
            if (!data)
                return;
            trackButtons.push(
                <TrackButton
                    key={index}
                    meta={data}
                    text={data.name}
                    subtext={data.artist}
                    img={data.artwork}
                    color={'black'}
                    isPlaying={false}
                    onEvent={this.handleEvent}/>
            );
        });
        return trackButtons;
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    componentWillMount() {
        if (!this.state.data) {
            this.fetchTracks();
        }
    }

    render() {
        return (
            <div className={`view playlist-view ${this.props.classNames}`}>
                <Header
                    backButton
                    showTitle={this.state.isScrolled}
                    text="Playlist"
                    backText="Playlists"
                    onEvent={this.handleEvent}/>
                <div className="track-container">
                    {this.renderTrackButtons()}
                </div>
            </div>
        );
    }
}


