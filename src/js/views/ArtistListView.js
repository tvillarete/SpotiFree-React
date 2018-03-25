import React, { Component } from 'react';
import NavButton from './components/NavButton';
import Header from '../Header';

export default class ArtistListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data.memoized,
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
                    this.handleEvent({
                        type: 'memoize',
                        memoized: data,
                    });
                });
            });
    }

    renderArtistButtons() {
        let artistButtons = [];

        this.state.data.forEach(data => {
            artistButtons.push(
                <NavButton
                 color="black"
                 key={data.artist}
                 type="view"
                 view="artist"
                 artist={data.artist}
                 category="artist"
                 text={data.artist}
                 onEvent={this.handleEvent}/>
            );
        });
        return artistButtons;
    }

    componentWillMount() {
        if (!this.state.data) {
            this.fetchArtists();
        }
    }

    render() {
        return (
            <div className="view artist-list-view">
                <Header
                 text="Artists"
                 backText="Library"
                 onEvent={this.handleEvent}/>
                <div className="artist-button-container">
                    {this.state.data ? this.renderArtistButtons() : <h3>Loading...</h3>}
                </div>
            </div>
        );
    }
}
