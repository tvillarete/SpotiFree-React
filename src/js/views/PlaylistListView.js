import React, { Component } from 'react';
import PlaylistButton from './components/PlaylistButton';
import Header from '../Header';

export default class PlaylistListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data.memoized,
            isScrolled: false,
        }
    }

    // Passes event to SpotiFree.js
    handleEvent = (options) => {
        this.props.onEvent(options);
    }

    newPlaylist = () => {
        this.props.onEvent({
            type: 'modal-open',
            modal: 'playlistCreator',
        });
    }

    showPlaylist = options => {
        this.props.onEvent({
            type: 'view',
            category: 'playlist', /* artist, album */
            value: {
                playlist: options.name
            }
        });
    }

    handleScroll = (e) => {
        const scrollPos = window.pageYOffset;
        const threshhold = 48;
        this.setState({ isScrolled: scrollPos >= threshhold });
    }

    getNewPlaylistButton = () => {
        return (
            <PlaylistButton
                img="files/images/playlist_add.jpg"
                name="New Playlist..."
                color="red"
                onEvent={this.newPlaylist} />
        );
    }

    getPlaylistButtons = () => {
        const playlists = this.state.playlists;
        let playlistButtons = [];

        for (let name in playlists) {
            playlistButtons.push(
                <PlaylistButton
                    key={name}
                    name={name}
                    chevron
                    onEvent={this.showPlaylist}/>
            );
        };
        return playlistButtons;
    }

    fetchPlaylists = () => {
        const playlists = localStorage.playlists ? JSON.parse(localStorage.playlists) : {};
        this.setState({ playlists: playlists });
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }


    componentWillMount() {
        if (!this.state.data) {
            this.fetchPlaylists();
        }
    }

    render() {
        return (
            <div className={`view playlist-list-view ${this.props.classNames}`}>
                <Header
                    text="Playlists"
                    showTitle={this.state.isScrolled}
                    backButton
                    backText="Library"
                    onEvent={this.handleEvent}/>
                <h1 className="view-header">Playlists</h1>
                <div className="playlist-button-container">
                    {this.getNewPlaylistButton()}
                    {this.getPlaylistButtons()}
                </div>
            </div>
        );
    }
}
