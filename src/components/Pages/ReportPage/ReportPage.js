import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import ImageGallery from '../../Subcomponents/ImageGallery/ImageGallery';
import PendingModal from '../../Modals/PendingModal/PendingModal';

class ReportPage extends Component {
  state = {
    showModal: false,
    selectedItem: null,
  };

  showModal() {
    this.setState({
      showModal: true,
    });
  }

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  setItem = (item) => (event) => {
    console.log('click', item);
    this.setState(
      {
        selectedItem: item,
      },
      () => {
        this.showModal();
      }
    );
  };

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
                  setItem={this.setItem}
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
        <PendingModal
          show={this.state.showModal}
          closeModal={this.closeModal}
          challenge={this.state.selectedItem}
        />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ReportPage);
