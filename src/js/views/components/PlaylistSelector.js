import React, { Component } from 'react';
import Header from '../../Header';
import PlaylistButton from './PlaylistButton';

export default class PlaylistSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: {},
            isScrolled: false,
            track: props.options,
        }
    }

    closeModal = () => {
        this.props.onEvent({
            type: 'modal-close',
            modals: ['playlistSelector']
        });
    }

    handleScroll = (e) => {
        const scrollPos = document.getElementById('playlistContainer').scrollTop;
        const threshhold = 60;
        this.setState({ isScrolled: scrollPos >= threshhold });
    }

    newPlaylist = () => {
        this.props.onEvent({
            type: 'modal-open',
            modal: 'playlistCreator',
            value: this.props.options,
        });
    }

    addToPlaylist = (options) => {
        let playlists = JSON.parse(localStorage.playlists) || {};
        const track = this.state.track;

        playlists[options.name].tracks.push(track);
        localStorage.playlists = JSON.stringify(playlists);

        this.props.onEvent({
            type: 'modal-close',
            modals: ['playlistSelector'],
        });
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
                    onEvent={this.addToPlaylist}/>
            );
        };
        return playlistButtons;
    }

    fetchPlaylists = () => {
        const playlists = localStorage.playlists ? JSON.parse(localStorage.playlists) : {};
        this.setState({ playlists: playlists });
    }

    componentWillMount() {
        this.fetchPlaylists();
    }

    render() {
        const classNames = `${this.props.isClosing ? 'closing' : ''}`;

        return (
            <div className={`modal playlist-selector ${classNames}`}>
                <Header
                    position="relative"
                    text="Add to a Playlist"
                    showTitle={this.state.isScrolled}
                    rightCancelButton
                    onCancel={this.closeModal}
                    onEvent={this.handleEvent}/>
                <div className="modal-content-container playlist-container" id="playlistContainer"
                    onScroll={this.handleScroll}>
                    <h2 className="view-header">Add to a Playlist</h2>
                    {this.getNewPlaylistButton()}
                    {this.getPlaylistButtons()}
                </div>
            </div>
        );
    }
}
