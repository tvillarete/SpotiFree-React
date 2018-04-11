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

    handleCancel = () => {
        this.props.onCancel();
    }

    handleDone = () => {
        this.props.onDone();
    }

    render() {
        const {
            position,
            backButton,
            leftCancelButton,
            text,
            rightCancelButton,
            rightDoneButton,
        } = this.props;

        return(
            <div className={`header ${position === 'relative' ? 'relative' : ''}`}>
                <div className="left-container">
                    {backButton ?
                        <BackButton {...this.props} onEvent={this.handleEvent} /> : ''}
                    {leftCancelButton ?
                        <h3 className="cancel-button"
                            onClick={this.handleCancel}>Cancel</h3> : ''}
                </div>
                <div className="mid-container">
                    <h3 className={`header-title ${this.props.showTitle ? '' : 'invisible'}`}>
                        {text}
                    </h3>
                </div>
                <div className="right-container">
                    {rightCancelButton ?
                        <h3 className="cancel-button"
                            onClick={this.handleCancel}>Cancel</h3> : ''}
                    {rightDoneButton ?
                        <h3 className="done-button"
                            onClick={this.handleDone}>Done</h3> : ''}
                </div>
            </div>
        );
    }
}

class BackButton extends Component {
    handleClick = () => {
        this.props.onEvent({
            type: 'back'
        });
    }

    render() {
        return (
            <div className="back-button"
                onClick={this.handleClick}>
                <ChevronLeft />
                <h3>{this.props.backText || 'Back'}</h3>
            </div>
        );
    }
}
