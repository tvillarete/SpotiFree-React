import React, { Component } from 'react';
import { ChevronRight } from 'react-feather';

export default class NavButton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleMainEvent = this.handleMainEvent.bind(this);
    }

    handleMainEvent() {
        if (this.props.view) {
            this.props.onEvent({
                type: 'view',
                category: this.props.category,
                value: {view: this.props.view, artist: this.props.artist}
            })
        }
    }

    render() {
        return (
            <div className={`nav-button ${this.props.color} ${this.props.subtext ? 'with-subtext' : ''}`}
             onClick={this.handleMainEvent}>
                <div className="left-container">
                    {this.props.img
                        ? <img alt="Artwork" src={this.props.img} />
                        : ''}
                    <div className="text-container">
                        <h3 className="text">{this.props.text}</h3>
                        {this.props.subtext
                            ? <h4 className="subtext">{this.props.subtext}</h4>
                            : '' }
                    </div>
                </div>
                <div className="right-container">
                    {this.props.chevron
                        ? <ChevronRight className="nav-icon" />
                        : '' }
                </div>
            </div>
        );
    }
}
