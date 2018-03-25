import React, { Component } from 'react';
import AlbumButton from './components/AlbumButton';
import Header from '../Header';

export default class AlbumListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data.memoized,
        }
        this.handleEvent = this.handleEvent.bind(this);
        this.renderAlbumButtons = this.renderAlbumButtons.bind(this);
        this.fetchAlbums = this.fetchAlbums.bind(this);
        this.getViewContents = this.getViewContents.bind(this);
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
                    this.handleEvent({
                        type: 'memoize',
                        memoized: data,
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

    getViewContents() {

    }

    render() {
        return (
            <div className="view album-list-view">
                <Header
                 text="Albums"
                 backText="Library"
                 onEvent={this.handleEvent}/>
                <div className="album-item-container">
                    {this.state.data ? this.renderAlbumButtons() : ''}
                </div>
            </div>
        );
    }
}
