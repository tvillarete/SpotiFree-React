import React, { Component } from 'react';

export default class Welcome extends Component {
    render() {
        return (
            <div className={`welcome-container ${this.props.isClosing ? 'closing' : ''}`}>
                <div className="logo-container">
                    <div className="logo-bridge"></div>
                    <div className="logo-stem1"></div>
                    <div className="logo-stem2"></div>
                    <div className="logo-dot1"></div>
                    <div className="logo-dot2"></div>
                </div>
            </div>
        );
    }
}
