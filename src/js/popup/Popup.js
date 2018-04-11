import React, { Component } from 'react';

export default class Popup extends Component {
    handleClick = options => {
        this.props.onEvent(options);
    }

    hide = () => {
        this.props.onEvent({
            type: 'popup-close',
        });
    }

    getContainerButtons = (container) => {
        const popupButtons = [];
        const data = this.props.data[container];

        for (let name in data) {
            const action = data[name];
            popupButtons.push(
                <div className="popup-button"
                    key={name}
                    onClick={() => {this.handleClick(action)}}>
                    <h3 className="text" >
                        {name}
                    </h3>
                </div>
            );
        }
        return popupButtons;
    }

    render() {
        const popup = this.props.data;
        const classNames = `${popup.isClosing ? 'closing' : ''} ${popup.isOpen ? '' : 'hidden'}`;
        return (
            <div className="popup-container">
                <div className={`popup-cover ${classNames}`} onClick={this.hide}></div>
                <div className={`popup ${classNames}`}>
                    <div className="upper-container">
                        {this.getContainerButtons('topContainer')}
                    </div>
                    <div className="lower-container">
                        {this.getContainerButtons('bottomContainer')}
                    </div>
                </div>
            </div>
        );
    }
}
