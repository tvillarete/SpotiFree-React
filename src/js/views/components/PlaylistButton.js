import React, { Component } from 'react';
import { ChevronRight } from 'react-feather';

export default class PlaylistButton extends Component {
    handleClick = () => {
        this.props.onEvent({
            name: this.props.name,
        });
    }

    render() {
        return (
            <div className="playlist-select-button"
                onClick={this.handleClick}>
                <img alt={this.props.name} src={this.props.img || 'files/images/music.jpg'} />
                <div className="text-container">
                    <h3 className={this.props.color}>{this.props.name}</h3>
                    {this.props.chevron ?
                        <ChevronRight /> : ''}
                </div>
            </div>
        );
    }
}
