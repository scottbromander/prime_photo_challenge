import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import ImageUploadModal from '../../Modals/ImageUploadModal/ImageUploadModal';
import toastr from 'toastr';
import PendingModal from '../../Modals/PendingModal/PendingModal';

toastr.options = {
  closeButton: true,
  progressBar: true,
};

class UserPage extends Component {
  state = {
    showModal: false,
    showSubmittedModal: false,
  };

  componentDidMount() {
    this.props.dispatch({ type: 'GET_CHALLENGES' });
    this.props.dispatch({ type: 'GET_PHOTO' });
  }

  toggleModal = (trigger, challenge) => (event) => {
    if (trigger) {
      this.setState({
        showModal: true,
        currentChallenge: challenge,
      });
    } else {
      this.setState({
        showModal: false,
      });
    }
  };

  closeModal = () => {
    this.setState(
      {
        showModal: false,
      },
      () => {
        // TODO: NEED TO OFFLOAD THIS TO A 201
        toastr.success('GOT IT!');
      }
    );
  };

  showSubmitModal = (challenge) => (event) => {
    this.setState({
      showSubmittedModal: true,
      currentChallenge: challenge,
    });
  };

  closeSubmittedModal = (event) => {
    this.setState({
      showSubmittedModal: false,
    });
  };

  render() {
    const challengeArray = this.props.store.challengesReducer.map(
      (item, index) => {
        let button = (
          <button
            className="btn btn-primary btn-sm"
            onClick={this.toggleModal(true, item)}
          >
            Submit
          </button>
        );

        for (let challenge of this.props.store.teamChallengesReducer) {
          if (challenge.challenge_id === item.id) {
            switch (challenge['status_name']) {
              case 'pending':
                button = (
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={this.showSubmitModal(challenge)}
                  >
                    Submitted
                  </button>
                );
                break;
              case 'approved':
                button = (
                  <button className="btn btn-success btn-sm">Accepted!</button>
                );
                break;
              case 'declined':
                button = (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={this.toggleModal(true, item)}
                  >
                    Rejected
                  </button>
                );
                break;
              default:
                break;
            }
          }
          continue;
        }

        return (
          <tr key={index}>
            <td>
              <p className="lead" style={{ marginBottom: '0px' }}>
                {item.description}
              </p>
            </td>
            <td>{button}</td>
          </tr>
        );
      }
    );

    const name = this.props.store.user.username
      ? this.props.store.user.username.toUpperCase()
      : 'ANON';

    let starterUser = <div></div>;
    let showStarter = false;

    if (this.props.user.team === null) {
      starterUser = (
        <div style={{ textAlign: 'center' }}>
          <h3>NO TEAM YET</h3>
          <p>Hang tight, we will hook it up!</p>
        </div>
      );
      showStarter = true;
    }
    // else if (this.props.store.teamChallengesReducer.length === 0) {
    //   starterUser = (
    //     <div>
    //       <div style={{ margin: '0 auto', textAlign: 'center' }}>
    //         <div className="spinner-border text-dark"></div>
    //         <h6>Loading</h6>
    //       </div>
    //     </div>
    //   );
    //   showStarter = true;
    // }

    return (
      <div>
        {showStarter ? (
          <div>{starterUser}</div>
        ) : (
          <div>
            <div style={{ textAlign: 'center' }}>
              <h1 id="welcome">Welcome, {name}!</h1>
            </div>

            <hr />

            <div className="card">
              <table className="table table-striped ">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Challenge</th>
                    <th scope="col" style={{ textAlign: 'center' }}>
                      Submit
                    </th>
                  </tr>
                </thead>
                <tbody>{challengeArray}</tbody>
              </table>
              <ImageUploadModal
                show={this.state.showModal}
                toggleModal={this.toggleModal}
                closeModal={this.closeModal}
                challenge={this.state.currentChallenge}
              />
              <PendingModal
                show={this.state.showSubmittedModal}
                closeModal={this.closeSubmittedModal}
                challenge={this.state.currentChallenge}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
