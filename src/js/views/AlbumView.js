import React, { Component } from 'react';
import TrackButton from './components/TrackButton';
import Header from '../Header';

export default class AlbumView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data.memoized,
        }
        this.handleEvent = this.handleEvent.bind(this);
        this.renderTrackButtons = this.renderTrackButtons.bind(this);
        this.fetchTracks = this.fetchTracks.bind(this);
    }

    // Passes event to SpotiFree.js
    handleEvent(options) {
        if (options.type === 'play-new') {
            let index = 0;
            const data = this.state.data;
            for (let track in data) {
                const trackData = data[track];
                if (trackData.name === options.value.name) {
                    index = parseInt(track, 10);
                }
            }
            Object.assign(options, {
                playlist: this.state.data,
                index: index,
            });
        }
        this.props.onEvent(options);
    }

    handleResize = () => {
        this.setState(state => {
            state.isMobile = window.innerWidth < 750;
            return state;
        });
    }

    fetchTracks() {
        fetch(`http://tannerv.ddns.net:3000/api/album/${this.props.album}`)
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

    renderTrackButtons() {
        let trackButtons = [];

        this.state.data.forEach(data => {
            trackButtons.push(
                <TrackButton
                    key={data.track}
                    meta={data}
                    text={data.name}
                    color="black"
                    isPlaying={false}
                    currentTrack={this.props.track.meta.name === data.name}
                    onEvent={this.handleEvent}/>
            );
        });
        return trackButtons;
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    componentWillMount() {
        if (!this.state.data) {
            this.fetchTracks();
        }
    }

    render() {
        return (
            <div className={`view album-view ${this.props.classNames}`}>
                <Header
                    backButton
                    backText="Albums"
                    onEvent={this.handleEvent}/>
                <div className="album-container">
                    <AlbumHeader
                        {...this.props}
                     title={this.props.album}
                     artist={this.props.artist}
                     artwork={this.props.artwork}
                     isMobile={this.state.isMobile}/>
                    <div className="track-container">
                        {this.state.isMobile ? '' :
                            <AlbumMetadata {...this.props}
                                isMobile />}
                        {this.state.data ? this.renderTrackButtons() : ''}
                    </div>
                </div>
            </div>
        );
    }
}

class AlbumHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: props.isMobile
        }
    }

    render() {
        return(
            <div className="album-header">
                <img className="album-artwork" alt={this.props.title} src={this.props.artwork} />
                {this.props.isMobile ?  <AlbumMetadata {...this.props} /> : ''}
            </div>
        );
    }
}

class AlbumMetadata extends Component {
    render() {
        return (
            <div className="album-metadata-container">
                <h3 className="album-title">{this.props.album}</h3>
                <h3 className="album-artist">{this.props.artist}</h3>
            </div>
        );
    }
}


