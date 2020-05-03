import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import ImageUploadModal from '../../Modals/ImageUploadModal/ImageUploadModal';
import toastr from 'toastr';
import CreateTeam from '../../Subcomponents/CreateTeam';

toastr.options = {
  closeButton: true,
  progressBar: true,
};

class UserPage extends Component {
  state = {
    showModal: false,
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
        toastr.success('GOT IT!');
      }
    );
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
                  <button className="btn btn-warning btn-sm" disabled>
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
                  <button className="btn btn-danger btn-sm">Rejected</button>
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

    return (
      <div>
        <h1 id="welcome">Welcome, {name}!</h1>
        {!this.props.user.team && <CreateTeam />}

        <div className="card">
          <table className="table table-striped ">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Challenge</th>
                <th scope="col">Submit</th>
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
          {/* <SubmittedImageModal
            submission={this.state}
          /> */}
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
