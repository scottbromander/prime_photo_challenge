import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Card } from 'react-bootstrap';
import SubmittedImageModal from '../../Modals/SubmittedImageModal/SubmittedImageModal';

const smallTextStyle = {
  fontSize: '12px',
  marginTop: '10px',
};

class AdminPage extends Component {
  state = {
    show: false,
    item: null,
  };

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_PENDING_SUBMISSIONS' });
  }

  selectSubmission = (submission) => (event) => {
    console.log('submission');
    this.setState({
      item: submission,
      show: true,
    });
  };

  closeModal = (event) => {
    this.setState({
      show: false,
    });
  };

  render() {
    const submissionArray = this.props.store.submissionReducer.map(
      (item, index) => {
        return (
          <div
            style={{
              margin: '10px',
              display: 'inline-block',
              textAlign: 'center',
            }}
            key={index}
            onClick={this.selectSubmission(item)}
          >
            <Card>
              <img
                style={{
                  width: '250px',
                }}
                src={item.image_url}
                alt={item.description}
              />
              <p style={smallTextStyle}>{item.description}</p>
            </Card>
          </div>
        );
      }
    );

    return (
      <div>
        <p>ADMIN PAGE</p>
        {submissionArray.length === 0 && (
          <div style={{ textAlign: 'center' }}>
            <h1>All caught up!</h1>
          </div>
        )}
        <div>{submissionArray}</div>
        <SubmittedImageModal
          show={this.state.show}
          item={this.state.item}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminPage);
