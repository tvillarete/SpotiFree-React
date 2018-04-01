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
        this.state = {
            views: {
                'main': <MainView onEvent={this.handleEvent}/>,
                'artists': <ArtistListView onEvent={this.handleEvent}/>,
                'artist': <ArtistView onEvent={this.handleEvent}/>,
                'albums': <AlbumListView onEvent={this.handleEvent}/>,
                'album': <AlbumView onEvent={this.handleEvent}/>,
            },
            viewStack: [{
                data: {view: 'main'},
                props: {}
            }],
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

    handleEvent = (options) => {
        switch(options.type) {
            case 'view':
                this.changeView(options);
                break;
            case 'memoize':
                this.memoize(options);
                break;
            case 'back':
                this.lastView();
                break;
            case 'play-new':
                this.setupAudio(options);
                break;
            case 'play':
                this.resume();
                break;
            case 'pause':
                this.pause();
                break;
            case 'skip':
                this.skip();
                break;
            case 'time':
                this.changeTime(options);
                break;
            default:
                console.log("idk");
        }
    }

    changeView = (options) => {
        this.setState({ isEnteringNewView: true });
        setTimeout(() => {
            this.setState(state => {
                state.isEnteringNewView = false;
                state.viewStack[state.viewStack.length-1].props.isPrevView = true;
                state.viewStack.push({
                    data: options.value,
                    category: options.category,
                    props: {},
                });
                return state;
           });
        }, 150);
    }

    lastView = () => {
        this.setState({ isEnteringOldView: true });
        setTimeout(() => {
           this.setState(state => {
              state.isEnteringOldView = false;
              state.viewStack.pop();
              return state;
           });
        }, 150);
    }

    memoize = (options) => {
        this.setState(state => {
            let stack = state.viewStack;
            stack[stack.length-1].data.memoized = options.memoized;
            return state;
        });
    }

    setupAudio = options => {
        this.setState(state => {
            state.track.meta = options.value;
            state.track.src = options.value.url;
            state.isPlaying = true;
            state.track.playlist = options.playlist;
            state.track.index = options.index;
            this.updateControls();
            return state;
        });
    }

    updateControls = () => {
        const audio = document.getElementById('audio');
        let _this = this;

        if (this.state.isPlaying) {
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

    resume = () => {
        if (this.state.track.src) {
            this.setState(state => {
                state.isPlaying = true;
                return state;
            });
            this.updateControls();
        }
    }

    pause = () => {
        if (this.state.track.src) {
            this.setState(state => {
                state.isPlaying = false;
                return state;
            });
        }
    }

    skip = () => {
        if (this.state.track.playlist.length) {
            this.setState(state => {
                state.track.index++;
                let meta = state.track.playlist[state.track.index];
                state.track.meta = meta;
                state.track.src = meta.url;
                this.updateControls();
                return state;
            });
        }
    }

    changeTime = (options) => {
        if (this.state.track.src) {
            this.setState(state => {
                state.track.currentTime = options.value;
                return state;
            });
        }
    }

    updateTime = (timestamp) => {
        const convertedTimestamp = this.convertTime(Math.floor(timestamp));

        this.setState(state => {
            if (state.track.currentTime >= state.track.duration) {
                this.handleEvent({type: 'skip'})
                state.isPlaying = state.track.index <= state.track.playlist.length-1;
            }
            state.track.currentTime = timestamp;
            state.track.convertedCurrentTime = convertedTimestamp;
            return state;
        });
    }

    convertTime = (timestamp) => {
        let minutes = Math.floor(timestamp / 60);
        let seconds = timestamp - (minutes * 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return (minutes + ':' + seconds);
    }

    getView = () => {
        let stack = this.state.viewStack;
        var stackItem = stack[stack.length-1];
        //const isPrevView = stackItem.props.isPrevView;
        let view = this.state.views[stackItem.data.view];

        if (stackItem.category) {
            view = this.state.views[stackItem.category];
        }
        stackItem.props.data = stackItem.data;
        stackItem.props.artist = stackItem.data.artist;
        stackItem.props.album = stackItem.data.view;
        stackItem.props.artwork = stackItem.data.artwork;
        stackItem.props.onEvent = this.handleEvent;
        stackItem.props.isMobile = window.innerWidth <= 750;
        stackItem.props.classNames = `${stackItem.props.isPrevView ? 'slide-in-left' : ''} ${this.state.isEnteringNewView ? 'entering-new-view': ''} ${this.state.isEnteringOldView ? 'entering-old-view' : ''}`;

        // If a view has saved data, add that memoized data before returning
        // element.
        return React.cloneElement(view, stackItem.props);
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

    componentDidMount() {
        document.addEventListener("touchstart", function(){}, true);
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
