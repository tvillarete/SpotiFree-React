import React, { Component } from 'react';
import Controls from './controls/Controls';
import MainView from './views/MainView';
import ArtistListView from './views/ArtistListView';
import ArtistView from './views/ArtistView';
import AlbumListView from './views/AlbumListView';
import AlbumView from './views/AlbumView';

export default class SpotiFree extends Component {
    constructor() {
        super();
        this.handleEvent = this.handleEvent.bind(this);
        this.getView = this.getView.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.convertTime = this.convertTime.bind(this);
        this.state = {
            views: {
                'main': <MainView onEvent={this.handleEvent}/>,
                'artists': <ArtistListView onEvent={this.handleEvent}/>,
                'artist': <ArtistView onEvent={this.handleEvent}/>,
                'albums': <AlbumListView onEvent={this.handleEvent}/>,
                'album': <AlbumView onEvent={this.handleEvent}/>,
            },
            viewStack: [{data: {view: 'main'}}],
            track: {
                playlist: [],
                index: 0,
                duration: 0,
                convertedDuration: '0:00',
                currentTime: 0,
                convertedCurrentTime: '0:00',
                src: null,
                meta: {
                    name: 'SpotiFree',
                    artist: 'Tanner Villarete',
                    album: 'Stuff',
                    track: 0,
                    artwork: '/files/images/Artwork.jpg'
                },
            }
        }
    }

    handleEvent(options) {
        switch(options.type) {
            case 'view':
                this.setState(state => {
                    state.viewStack.push({
                        data: options.value,
                        category: options.category,
                    });
                    return state;
                });
                break;
            case 'memoize':
                this.setState(state => {
                    let stack = state.viewStack;
                    stack[stack.length-1].data.memoized = options.memoized;
                    return state;
                });
                break;
            case 'back':
                this.setState(state => {
                    state.viewStack.pop();
                    return state;
                });
                break;
            case 'play-new':
                this.setState(state => {
                    state.track.meta = options.value;
                    state.track.src = options.value.url;
                    state.isPlaying = true;
                    state.track.playlist = options.playlist;
                    state.track.index = options.index;
                    this.updateControls();
                    return state;
                });
                break;
            case 'play':
                if (this.state.track.src) {
                    this.setState(state => {
                        state.isPlaying = true;
                        return state;
                    });
                    this.updateControls();
                }
                break;
            case 'pause':
                if (this.state.track.src) {
                    this.setState(state => {
                        state.isPlaying = false;
                        return state;
                    });
                }
                break;
            case 'skip':
                if (this.state.track.playlist.length) {
                    this.setState(state => {
                        state.track.index++;
                        state.track.meta = state.track.playlist[state.track.index];
                        state.track.src = state.track.playlist[state.track.index].url;
                        return state;
                    });
                }
                break;
            case 'time':
                if (this.state.track.src) {
                    this.setState(state => {
                        state.track.currentTime = options.value;
                        return state;
                    });
                }
                break;
            default:
                console.log("idk");
        }
    }

    updateControls() {
        const audio = document.getElementById('audio');
        let _this = this;

        if (this.state.isPlaying) {
            console.log(audio);
            setTimeout(()=> {
                this.setState(state => {
                    state.track.duration = audio.duration;
                    state.track.convertedDuration = this.convertTime(Math.floor(audio.duration));
                });
            }, 100);
            this.intervalId = setInterval(function() {
                _this.updateTime(audio.currentTime);
            }, 100);
        }
    }

    updateTime(timestamp) {
        const convertedTimestamp = this.convertTime(Math.floor(timestamp));

        this.setState(state => {
            state.track.currentTime = timestamp;
            state.track.convertedCurrentTime = convertedTimestamp;
            return state;
        });
    }

    convertTime(timestamp) {
        let minutes = Math.floor(timestamp / 60);
        let seconds = timestamp - (minutes * 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return (minutes + ':' + seconds);
    }

    getView() {
        let stack = this.state.viewStack;
        var stackItem = stack[stack.length-1];
        let view = this.state.views[stackItem.data.view];

        if (stackItem.category) {
            view = this.state.views[stackItem.category];
        }

        // If a view has saved data, add that memoized data before returning
        // element.
        return React.cloneElement(
            view, {
                data: stackItem.data,
                artist: stackItem.data.artist,
                album: stackItem.data.view,
                artwork: stackItem.data.artwork,
                onEvent: this.handleEvent,
            }
        );
    }

    componentDidUpdate() {
        const audio = document.getElementById('audio');
        if (this.state.isPlaying) {
            if (audio.paused)
                audio.play();
        } else if (!this.state.isPlaying) {
            if (!audio.paused) {
                audio.pause();
            }
        }
    }

    render() {
        return (
            <div className="spotifree">
                {this.getView()}
                <div className="controls">
                    <Controls
                        track={this.state.track}
                        isPlaying={this.state.isPlaying}
                        onEvent={this.handleEvent}
                    />
                    <audio id="audio" src={this.state.track.src}></audio>
                </div>
            </div>
        );
    }
}
