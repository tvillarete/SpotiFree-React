import React, { Component } from 'react';

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
                <h3 className="text">{this.props.text}</h3>
                <h4 className="subtext">{this.props.subtext}</h4>
            </div>
        );
    }
}
