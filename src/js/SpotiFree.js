import React, { Component } from 'react';
import MainView from './views/MainView';
import ArtistListView from './views/ArtistListView';
import AlbumListView from './views/AlbumListView';
import AlbumView from './views/AlbumView';

export default class SpotiFree extends Component {
    constructor() {
        super();
        this.handleEvent = this.handleEvent.bind(this);
        this.getView = this.getView.bind(this);
        this.state = {
            views: {
                'main': <MainView onEvent={this.handleEvent}/>,
                'artists': <ArtistListView onEvent={this.handleEvent}/>,
                'albums': <AlbumListView onEvent={this.handleEvent}/>,
                'album': <AlbumView onEvent={this.handleEvent}/>,
            },
            viewStack: [{view: 'main'}],
        }
    }

    handleEvent(options) {
        switch(options.type) {
            case 'view':
                this.setState(state => {
                    state.viewStack.push({
                        view: options.value,
                        category: options.category,
                    });
                    return state;
                });
                break;
            case 'play':
                this.setState(state => {
                    state.audioSrc = options.value.url;
                    state.isPlaying = true;
                    return state;
                });
                break;
            default:
                console.log("idk");
        }
    }

    getView() {
        let stack = this.state.viewStack;
        var stackItem = stack[stack.length-1];
        if (stackItem.hasOwnProperty('category')) {
            if (stackItem.category === 'artist') {
                console.log("artist");
            } else if (stackItem.category === 'album') {
                return (
                    <AlbumView
                     album={stackItem.view.album}
                     artist={stackItem.view.artist}
                     onEvent={this.handleEvent}
                     />
                );
            }
        }

        return this.state.views[stack[stack.length-1].view];
    }

    componentDidUpdate() {
        let audio = document.getElementById('audio');
        if (this.state.isPlaying) {
            audio.play();
        }
    }

    render() {
        return (
            <div className="spotifree">
                {this.getView()}
                <audio id="audio" src={this.state.audioSrc}></audio>
            </div>
        );
    }
}
