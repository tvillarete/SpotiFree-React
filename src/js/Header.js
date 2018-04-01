import React, { Component } from 'react';
import { ChevronLeft } from 'react-feather';

export default class Header extends Component {
    constructor() {
        super();
        this.state = {

        }
        this.handleEvent = this.handleEvent.bind(this);
    }

    handleEvent(options) {
        this.props.onEvent(options);
    }

    render() {
        return(
            <div className="header">
                <div className="left-container">
                    <div className="back-button"
                        onClick={()=>{this.handleEvent({
                            type: 'back',
                        })}}>
                        <ChevronLeft />
                        <h3>{this.props.backText || 'Back'}</h3>
                    </div>
                </div>
                <div className="mid-container">
                    <h3 className={`header-title ${this.props.showTitle ? '' : 'invisible'}`}>
                        {this.props.text}
                    </h3>
                </div>
                <div className="right-container"></div>
            </div>
        );
    }
}
