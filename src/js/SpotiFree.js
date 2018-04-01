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
                //this.changeTime(options);
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
            state.isPlaying = true;
            state.track.meta = options.value;
            state.track.index = options.index;
            state.track.playlist = options.playlist;
            return state;
        }, this.playAudio);
    }

    playAudio = () => {
        this.audioElement.load();
        this.audioElement.play();
    }

    onAudioEnded = () => {
        this.skip();
    }

    resume = () => {
        this.setState({ isPlaying: true }, () => {
            this.audioElement.play();
        });
    }

    pause = () => {
        this.setState({ isPlaying: false }, () => {
            this.audioElement.pause();
        });
    }

    skip = () => {
        this.setState(state => {
            state.track.index++;
            if (state.track.index > state.track.playlist.length-1) {
                return null
            }
            state.isPlaying = true;
            state.track.meta = state.track.playlist[state.track.index];
            return state;
        }, this.playAudio);
    }

    getView = () => {
        const stack = this.state.viewStack;
        let stackItem = stack[stack.length-1];
        let view = this.state.views[stackItem.data.view];

        if (stackItem.category) {
            view = this.state.views[stackItem.category];
        }
        stackItem.props.data = stackItem.data;
        stackItem.props.track = this.state.track;
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

    componentDidMount() {
        // Used to remove grey highlighting on touch events
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
                    <audio
                        ref={(audio) => {this.audioElement = audio}}
                        src={this.state.track.meta.url}
                        onEnded={this.onAudioEnded}></audio>
                </div>
            </div>
        );
    }
}
