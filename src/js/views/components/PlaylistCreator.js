import React, { Component } from 'react';
import Header from '../../Header';

export default class PlaylistCreator extends Component {
    handleCancel = () => {
        this.props.onEvent({
            type: 'modal-close',
            modals: ['playlistCreator']
        });
    }

    createPlaylist = () => {
        const name = this.refs.name.value;
        const description = this.refs.desc.value;
        let playlists = localStorage.playlists != null ?
         JSON.parse(localStorage.playlists) : {};

        playlists[name] = {
            description: description,
            tracks: this.props.options ? [this.props.options] : [],
        };
        localStorage.playlists = JSON.stringify(playlists);
        this.props.onEvent({
            type: 'modal-close',
            modals: ['playlistCreator', 'playlistSelector']
        });
    }

    fetchPlaylists = () => {
        const playlists = localStorage.playlists ? JSON.parse(localStorage.playlists) : {};
        this.setState({ playlists: playlists });
    }

    componentWillMount() {
        console.log(this.props);
        this.fetchPlaylists();
    }

    render() {
        const classNames = `${this.props.isClosing ? 'closing' : ''}`;

        return (
            <div className={`modal playlist-creator ${classNames}`}>
                <Header
                    position="relative"
                    text="New Playlist"
                    showTitle={true}
                    leftCancelButton
                    rightDoneButton
                    onCancel={this.handleCancel}
                    onDone={this.createPlaylist}
                    onEvent={this.handleEvent}/>
                <div className="modal-content-container" id="playlistContainer">
                    <div className="header-info-container">
                        <img alt="Playlist Icon" src={'files/images/music.jpg'} />
                        <textarea required placeholder="Playlist Name" ref="name"></textarea>
                    </div>
                    <div className="description-container">
                       <textarea required placeholder="Description" ref="desc"></textarea>
                    </div>
                </div>
            </div>
        );
    }
}
