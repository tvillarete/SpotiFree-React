import React, { Component } from 'react';
import NavButton from './components/NavButton';

export default class ArtistListView extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
        }
        this.handleEvent = this.handleEvent.bind(this);
        this.renderArtistButtons = this.renderArtistButtons.bind(this);
        this.fetchArtists = this.fetchArtists.bind(this);
    }

    // Passes event to SpotiFree.js
    handleEvent(options) {
        this.props.onEvent(options);
    }

    fetchArtists() {
        fetch('http://tannerv.ddns.net:3000/api/artists')
            .then(response => {
                response.json().then((data) => {
                    this.setState({
                        data: data,
                    });
                });
            });
    }

    renderArtistButtons() {
        let artistButtons = [];

        this.state.data.forEach(data => {
            artistButtons.push(
                <NavButton
                 key={data.artist}
                 type="view"
                 view="artist"
                 text={data.artist}
                 onEvent={this.handleEvent}/>
            );
        });
        return artistButtons;
    }

    componentWillMount() {
        this.fetchArtists();
    }

    render() {
        if (!this.state.data) {
            return <h3>Loading...</h3>;
        }
        return (
            <div className="view artist-list-view">
                <h1>Artists</h1>
                {this.renderArtistButtons()}
            </div>
        );
    }
}
