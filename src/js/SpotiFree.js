import React, { Component } from 'react';
import Controls from './controls/Controls';
import Popup from './popup/Popup';
import PlaylistSelector from './views/components/PlaylistSelector';
import PlaylistCreator from './views/components/PlaylistCreator';
import Navigation from './navigation/Navigation';
import MainView from './views/MainView';
import SearchView from './search/SearchView';
import ArtistListView from './views/ArtistListView';
import ArtistView from './views/ArtistView';
import AlbumListView from './views/AlbumListView';
import AlbumView from './views/AlbumView';
import PlaylistListView from './views/PlaylistListView';
import PlaylistView from './views/PlaylistView';

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
                'playlists': <PlaylistListView onEvent={this.handleEvent}/>,
                'playlist': <PlaylistView onEvent={this.handleEvent}/>,
            },
            viewStack: [{
                data: {view: 'main'},
                props: {}
            }],
            popup: {
                isOpen: false,
                isClosing: false,
                topContainer: {},
                bottomContainer: {},
            },
            modals: {
                playlistSelector: {
                    isOpen: false,
                    isClosing: false,
                    data: null
                },
                playlistCreator: {
                    isOpen: false,
                    isClosing: false,
                    data: null
                }
            },
            controls: {
                isOpen: false,
                isClosing: false,
            },
            navSection: 'library',
            track: localStorage.track ? JSON.parse(localStorage.track) : {
                playlist: [],
                index: 0,
                duration: 0,
                convertedDuration: '0:00',
                currentTime: 0,
                convertedCurrentTime: '0:00',
                volume: 50,
                meta: {
                    name: 'SpotiFree',
                    artist: 'Tanner Villarete',
                    album: 'Stuff',
                    track: 0,
                    artwork: '/files/images/Artwork.jpg'
                },
            }
        };
    }

    handleEvent = (options) => {
        switch(options.type) {
            case 'view':
                this.changeView(options);
                break;
            case 'change-nav':
                this.setState({ navSection: options.value });
                break;
            case 'memoize':
                this.memoize(options);
                break;
            case 'back':
                this.lastView();
                break;
            case 'play-new':
                Object.assign(options, {play: true});
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
            case 'previous':
                this.previous();
                break;
            case 'time':
                this.audioElement.currentTime = options.value;
                break;
            case 'fullscreen-controls':
                this.setState({ fullscreenControls: options.value });
                break;
            case 'volume':
                this.changeVolume(options.value);
                break;
            case 'popup':
                this.showPopup(options);
                break;
            case 'popup-close':
                this.hidePopup(options);
                break;
            case 'controls':
                this.toggleControls(options);
                break;
            case 'modal-open':
                this.toggleModal(options);
                break;
            case 'modal-close':
                this.closeModal(options);
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
        }, options.play ? this.playAudio : '');
    }

    playAudio = () => {
        this.audioElement.load();
        this.playPromise = this.audioElement.play();
        this.playPromise.then(() => {
            this.setState(state => {
                state.track.duration = Math.floor(this.audioElement.duration);
                return state;
            });
            this.setUpdateInterval();
        });
    }

    setUpdateInterval = () => {
        this.updateInterval = setInterval(() => {
            this.setState(state => {
                state.track.currentTime = this.audioElement.currentTime;
                localStorage.track = JSON.stringify(this.state.track);
                return state;
            });
        }, 300);
    }

    onAudioEnded = () => {
        this.skip();
    }

    resume = () => {
        if (this.audioElement.src) {
            this.setState({ isPlaying: true }, () => {
                this.audioElement.play();
            });
        }
        this.setUpdateInterval();
    }

    pause = () => {
        if (this.audioElement.src) {
            this.setState({ isPlaying: false }, () => {
                this.audioElement.pause();
            });
        }
        clearInterval(this.updateInterval);
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

    previous = () => {
        this.setState(state => {
            if (state.track.currentTime > 3) {
                state.track.currentTime = 0;
                state.isPlaying = true;
                return state;
            }
            state.track.index--;
            if (state.track.index < 0) {
                return null
            }
            state.isPlaying = true;
            state.track.meta = state.track.playlist[state.track.index];
            return state;
        }, this.playAudio);
    }

    changeVolume = value => {
        this.setState(state => {
            state.track.volume = value;
            return state;
        }, () => {
            if (this.audioElement.src) {
                this.audioElement.volume = value/100;
            }
        });
    }

    showPopup = options => {
        this.setState({
            popup: {
                isOpen: true,
                topContainer: options.topContainer,
                bottomContainer: options.bottomContainer,
            }
        })
    }

    hidePopup = () => {
        this.setState(state => {
            state.popup.isClosing = true;
            return state;
        });
        setTimeout(() => {
            this.setState(state => {
                state.popup.isClosing = false;
                state.popup.isOpen = false;
                return state;
            });
        }, 240);
    }

    toggleControls = options => {
        if (options.value) {
            this.setState(state => {
                state.controls.isOpen = true;
                return state;
            });
        } else {
            this.hideControls();
        }
    }

    hideControls = () => {
        this.setState(state => {
            state.controls.isOpen = false;
            return state;
        });
    }

    toggleModal = options => {
        const modal = options.modal;

        this.hidePopup();
        this.setState(state => {
            state.modals[modal].isOpen = true;
            state.modals[modal].data = options.value;
            return state;
        });
    }

    closeModal = options => {
        this.setState(state => {
            for (let modal in options.modals) {
                const name = options.modals[modal];
                state.modals[name].isClosing = true;
            }
            return state;
        });
        setTimeout(() => {
            this.setState(state => {
                for (let modal in options.modals) {
                    const name = options.modals[modal];
                    state.modals[name].isClosing = false;
                    state.modals[name].isOpen = false;
                }
                return state;
            });
        }, 350);

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
            <div className={`spotifree ${this.state.controls.isOpen ? 'controls-open' : ''}`}>
                {this.state.navSection === 'library' ? this.getView() : <SearchView />}
                <div className="bottom-bar">
                    <Navigation
                        grayed={this.state.fullscreenControls}
                        current={this.state.navSection}
                        onEvent={this.handleEvent}/>
                    <div className={`controls-cover ${this.state.controls.isOpen ? '' : 'hidden'} ${this.state.controls.isClosing ? 'closing' : ''}`}
                        onClick={this.hideControls}></div>
                    <Controls
                        track={this.state.track}
                        isPlaying={this.state.isPlaying}
                        data={this.state.controls}
                        onEvent={this.handleEvent}
                    />
                    <audio
                        ref={(audio) => {this.audioElement = audio}}
                        src={this.state.track.meta.url}
                        onEnded={this.onAudioEnded}></audio>
                </div>
                {this.state.modals.playlistSelector.isOpen ?
                    <PlaylistSelector
                        options={this.state.modals.playlistSelector.data}
                        isClosing={this.state.modals.playlistSelector.isClosing}
                        onEvent={this.handleEvent}/> : ''}
                {this.state.modals.playlistCreator.isOpen ?
                    <PlaylistCreator
                        options={this.state.modals.playlistCreator.data}
                        isClosing={this.state.modals.playlistCreator.isClosing}
                        onEvent={this.handleEvent}/> : ''}
                {this.state.popup.isOpen ?
                    <Popup data={this.state.popup}
                        onEvent={this.handleEvent}/> : ''}
            </div>
        );
    }
}
