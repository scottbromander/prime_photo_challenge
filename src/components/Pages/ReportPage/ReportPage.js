import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import MasonryGallery from '../../Subcomponents/ImageGallery';

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
            <th scope="row">{item.team_id}</th>
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
            <tbody>{leaderboardArray}</tbody>
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
