import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class CreateTeam extends Component {
  render() {
    return (
      <div>
        <div>Team creation whatnot happens here</div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateTeam);
