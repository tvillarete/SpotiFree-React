import React, { Component } from 'react';
import { Book, Search } from 'react-feather';

export default class Navigation extends Component {
    handleEvent = (options) => {
        this.props.onEvent(options);
    }

    showSearch = () => {
        this.handleEvent({
            type: 'change-nav',
            value: 'search'
        });
    }

    showLibrary = () => {
        this.handleEvent({
            type: 'change-nav',
            value: 'library',
        });
    }

    render() {
        return (
            <div className="navigation">
                <div className={`section-nav-button ${this.props.current === 'library' ? 'selected' : ''}`}
                    onClick={this.showLibrary}>
                    <Book />
                    <h3>Library</h3>
                </div>
                <div className={`section-nav-button ${this.props.current === 'search' ? 'selected' : ''}`}
                    onClick={this.showSearch}>
                    <Search />
                    <h3>Search</h3>
                </div>
            </div>
        );
    }
}
