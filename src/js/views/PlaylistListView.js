import React, { Component } from 'react';
import NavButton from './components/NavButton';
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

    handleScroll = (e) => {
        const scrollPos = window.pageYOffset;
        const threshhold = 48;
        this.setState({ isScrolled: scrollPos >= threshhold });
    }

    fetchPlaylists = () => {

    }

    renderPlaylistButtons = () => {
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
            <div className={`view playlist-view ${this.props.classNames}`}>
                <Header
                    text="Playlists"
                    showTitle={this.state.isScrolled}
                    backText="Library"
                    onEvent={this.handleEvent}/>
                <h1 className="view-header">Playlists</h1>
                <div className="artist-button-container">
                    {this.state.data ? this.renderPlaylistButtons() : '' }
                </div>
            </div>
        );
    }
}
