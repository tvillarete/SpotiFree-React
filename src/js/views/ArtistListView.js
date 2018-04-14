import React, { Component } from 'react';
import NavButton from './components/NavButton';
import Header from '../Header';

export default class ArtistListView extends Component {
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

    fetchArtists = () => {
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

    renderArtistButtons = () => {
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
            this.fetchArtists();
        }
    }

    render() {
        return (
            <div className={`view artist-list-view ${this.props.classNames}`}>
                <Header
                    text="Artists"
                    showTitle={this.state.isScrolled}
                    backButton
                    backText="Library"
                    onEvent={this.handleEvent}/>
                <h1 className="view-header">Artists</h1>
                <div className="button-container">
                    {this.state.data ? this.renderArtistButtons() : '' }
                </div>
            </div>
        );
    }
}
