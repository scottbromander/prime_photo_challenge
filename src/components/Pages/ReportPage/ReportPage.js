import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import ImageGallery from '../../Subcomponents/ImageGallery';

class ReportPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_ALL_APPROVED_SUBMISSIONS' });
    this.props.dispatch({ type: 'FETCH_LEADERBOARD' });
  }

  render() {
    const leaderboardArray = this.props.store.leaderboardReducer.map(
      (item, index) => {
        return (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td className="lead">{item.name}</td>
            <td className="lead" style={{ textAlign: 'center' }}>
              {item.score}
            </td>
          </tr>
        );
      }
    );

    return (
      <div>
        <div>
          <div style={{ textAlign: 'center' }}>
            <h2>Results</h2>
            <hr />
          </div>

          {leaderboardArray.length > 0 ? (
            <div>
              <h4>Leaderboard</h4>
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
                <tbody>{leaderboardArray}</tbody>
              </table>

              <hr />

              <h4>Gallery</h4>
              <div style={{ padding: '0 16px' }}>
                <ImageGallery
                  elements={this.props.store.allApprovedSubmissionReducer}
                />
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <h3>Nothing to report yet!</h3>
              <p>No approved submissions</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ReportPage);
