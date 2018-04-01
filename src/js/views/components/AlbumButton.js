import React, { Component } from 'react';
//import FadeIn from "react-lazyload-fadein";

export default class AlbumButton extends Component {
    constructor(props) {
        super(props);
        this.handleMainEvent = this.handleMainEvent.bind(this);
    }

    handleMainEvent() {
        this.props.onEvent({
            type: 'view',
            category: this.props.category, /* artist, album */
            value: {
                view: this.props.title,
                artist: this.props.artist,
                artwork: this.props.artwork,
            }
        });
    }

    render() {
        return (
            <div className="album-button"
             onClick={this.handleMainEvent}>
                <img
                    alt={this.props.title}
                    src={this.props.artwork}
                 />
                <h3 className="album-button-text">{this.props.title}</h3>
                <h3 className="album-button-subtext">{this.props.artist}</h3>
            </div>
        );
    }
}
