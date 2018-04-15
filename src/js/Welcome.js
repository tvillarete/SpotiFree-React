import React, { Component } from 'react';

export default class Welcome extends Component {
    render() {
        return (
            <div className={`welcome-container ${this.props.isClosing ? 'closing' : ''}`}>
                <div className="logo-container">
                    <img alt="note" src="files/images/note.svg" />
                </div>
            </div>
        );
    }
}
