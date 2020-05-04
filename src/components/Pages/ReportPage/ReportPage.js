import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class ReportPage extends Component {
  render() {
    return (
      <div>
        <div>
          <p>Da report Page</p>

          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Team</th>
                <th scope="col" style={{ textAlign: 'center' }}>
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Awesomeness</td>
                <td>12</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Whatever</td>
                <td>12</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>SQUIRREL!</td>
                <td>12</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Go, Fight, Win</td>
                <td>12</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ReportPage);
