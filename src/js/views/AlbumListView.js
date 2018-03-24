import React, { Component } from 'react';
import AlbumButton from './components/AlbumButton';

export default class AlbumListView extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
        }
        this.handleEvent = this.handleEvent.bind(this);
        this.renderAlbumButtons = this.renderAlbumButtons.bind(this);
        this.fetchAlbums = this.fetchAlbums.bind(this);
    }

    // Passes event to SpotiFree.js
    handleEvent(options) {
        this.props.onEvent(options);
    }

    fetchAlbums() {
        fetch('http://tannerv.ddns.net:3000/api/albums')
            .then(response => {
                response.json().then((data) => {
                    this.setState({
                        data: data,
                    });
                });
            });
    }

    renderAlbumButtons() {
        let albumButtons = [];

        this.state.data.forEach(data => {
            albumButtons.push(
                <AlbumButton
                 key={data.album}
                 title={data.album}
                 artist={data.artist}
                 artwork={data.artwork}
                 onEvent={this.handleEvent}/>
            );
        });
        return albumButtons;
    }

    componentWillMount() {
        this.fetchAlbums();
    }

    render() {
        if (!this.state.data) {
            return <h3>Loading...</h3>;
        }
        return (
            <div className="view album-view">
                <h1>Albums</h1>
                {this.renderAlbumButtons()}
            </div>
        );
    }
}
