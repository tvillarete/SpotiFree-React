import React, { Component } from 'react';
import NavButton from './components/NavButton';

const buttonData = [
    {view: 'artists', text: 'Artists'},
    {view: 'albums', text: 'Albums'},
    {view: 'playlists', text: 'Playlists'},
];

export default class MainView extends Component {

    constructor() {
        super();
        this.state = {

        }
        this.handleEvent = this.handleEvent.bind(this);
        this.renderNavButtons = this.renderNavButtons.bind(this);
    }

    // Passes event to SpotiFree.js
    handleEvent(options) {
        this.props.onEvent(options);
    }

    renderNavButtons() {

        return buttonData.map(button => {
            let navButtons = [];
            navButtons.push(
                <NavButton
                 key={button.text}
                 view={button.view}
                 text={button.text}
                 subtext={button.subtext}
                 chevron={true}
                 onEvent={this.handleEvent}/>
             );
            return navButtons;
        });
    }

    render() {
        return (
            <div className={`view main-view ${this.props.classNames}`}>
                <h1 className="view-header">Library</h1>
                <div className="button-container">
                    {this.renderNavButtons()}
                </div>
            </div>
        );
    }
}
