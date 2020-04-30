import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../../LogOutButton/LogOutButton';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import ImageUploadModal from '../../Modals/ImageUploadModal/ImageUploadModal';
import toastr from 'toastr';

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
    console.log('meow');
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
            className="btn btn-primary"
            onClick={this.toggleModal(true, item)}
          >
            Submit
          </button>
        );

        for (let challenge of this.props.store.teamChallengesReducer) {
          if (challenge.challenge_id === item.id) {
            console.log(challenge.status_name);
            switch (challenge['status_name']) {
              case 'pending':
                button = (
                  <button className="btn btn-warning" disabled>
                    Submitted
                  </button>
                );
                break;
              case 'declined':
                button = <button className="btn btn-danger">Rejected</button>;
                break;
            }
          }
          continue;
        }

        return (
          <tr key={index}>
            <td>
              <p className="h4">{item.description}</p>
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
        <p>Your ID is: {this.props.store.user.id}</p>

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
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
