import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import toastr from 'toastr';

class AdminPage extends Component {
  render() {
    return <div></div>;
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(AdminPage);
