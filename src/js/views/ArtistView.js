import React, { Component } from 'react';
import AlbumButton from './components/AlbumButton';
import Header from '../Header';

export default class ArtistView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data.memoized,
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
        fetch(`http://tannerv.ddns.net:3000/api/artist/${this.props.artist}`)
            .then(response => {
                response.json().then((albums) => {
                    this.setState({
                        data: albums,
                    });
                    this.handleEvent({
                        type: 'memoize',
                        memoized: albums,
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
                 category="album"
                 artwork={data.artwork}
                 onEvent={this.handleEvent}/>
            );
        });
        return albumButtons;
    }

    componentWillMount() {
        if (!this.state.data) {
            this.fetchAlbums();
        }
    }

    render() {
        return (
            <div className={`view artist-view ${this.props.classNames}`}>
                <Header
                 text={this.props.artist}
                 backButton
                 backText="Artists"
                 onEvent={this.handleEvent}/>
                <div className="album-list-container">
                    {this.state.data ? this.renderAlbumButtons() : ''}
                </div>
            </div>
        );
    }
}
