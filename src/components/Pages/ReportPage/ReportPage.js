import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import MasonryGallery from '../../Subcomponents/ImageGallery';

class ReportPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_ALL_APPROVED_SUBMISSIONS' });
  }

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

          <MasonryGallery
            elements={this.props.store.allApprovedSubmissionReducer}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ReportPage);
