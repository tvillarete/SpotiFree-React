import React, { Component } from 'react';
import { MoreHorizontal } from 'react-feather'

export default class OptionsButton extends Component {
    handleEvent = options => {
        this.props.onEvent(options);
    }

    /* Format:
     * 'button title' : { action }
     */
    showPopup = (e) => {
        e.stopPropagation();
        this.props.onEvent({
            type: 'popup',
            topContainer: {
                'Add to Playlist': {
                    type: 'modal-open',
                    modal: 'playlistSelector',
                    value: this.props.meta
                },
            },
            bottomContainer: {
                'Cancel': {
                    type: 'popup-close'
                }
            }
        });
    }

    render() {
        return (
            <div className="options-container">
                <MoreHorizontal onClick={this.showPopup} />
            </div>
        );
    }
}
