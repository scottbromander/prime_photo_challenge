import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

import './LandingPage.css';

class LandingPage extends Component {
  state = {
    heading: 'Class Component',
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className="container">
        {/* TODO: Switch to bootstrap grid. Basically, 'Pick one' */}
        <div className="grid">
          <div className="grid-col grid-col_12" style={{ textAlign: 'center' }}>
            <i
              className="fas fa-camera-retro"
              style={{ fontSize: '120px', marginBottom: '30px' }}
            ></i>
            <h3>Welcome to the Prime Photo Challenge</h3>
            <p>Click below to get started!</p>
            <button
              className="btn btn-primary "
              style={{ width: '200px' }}
              onClick={this.onLogin}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
