import React, { Component } from 'react';
import SpotiFree from './js/SpotiFree';
import Welcome from './js/Welcome';
import './main.css';

class App extends Component {
    state = {
        onWelcomeScreen: true,
        closingWelcomeScreen: false,
    }

    hideWelcome = () => {
        setTimeout(() => {
            this.setState({ closingWelcomeScreen: true });
            setTimeout(() => {
                this.setState({
                    closingWelcomeScreen: false,
                    onWelcomeScreen: false,
                });
            }, 1000);
        }, 1000);

    }

    componentDidMount() {
        this.hideWelcome();
    }

    render() {
        return (
            <div className="App">
                { this.state.onWelcomeScreen
                    ? <Welcome
                        isClosing={this.state.closingWelcomeScreen} />
                    : <SpotiFree />
                }
            </div>
        );
    }
}

export default App;
