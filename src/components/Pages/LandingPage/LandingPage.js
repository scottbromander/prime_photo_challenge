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
        <div className="grid">
          <div className="grid-col grid-col_12" style={{ textAlign: 'center' }}>
            <h3>Welcome to the Prime Photo Challenge</h3>
            <p>Click below to get started!</p>
            <button className="btn btn-primary btn-lg" onClick={this.onLogin}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
