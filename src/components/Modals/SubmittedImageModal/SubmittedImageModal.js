import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class SubmittedImageModal extends Component {
  state = {
    confirmDelete: false,
  };

  approveImage = (event) => {
    this.props.dispatch({
      type: 'APPROVE_SUBMISSION',
      payload: this.props.item,
    });
    this.props.closeModal();
  };

  declineImage = (event) => {
    this.setState({
      confirmDelete: true,
    });
  };

  cancelDeclineImage = (event) => {
    this.setState({
      confirmDelete: false,
    });
  };

  confirmDecline = (event) => {
    this.props.dispatch({
      type: 'DECLINE_SUBMISSION',
      payload: this.props.item,
    });
    this.props.closeModal();
    this.setState({
      confirmDelete: false,
    });
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        size="lg"
        onHide={this.props.closeModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.item && <p>{this.props.item.description}</p>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ width: '100%', margin: '0 auto' }}>
            {this.props.item && (
              <img
                src={this.props.item.image_url}
                alt={'Image of ' + this.props.item.description}
                style={{ width: '100%' }}
              />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {this.state.confirmDelete ? (
            <div style={{ margin: '0 auto', textAlign: 'center' }}>
              <span className="h5">
                ARE YOU SURE YOU WANT TO DECLINE THIS IMAGE?
              </span>
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <Button
                  variant="primary"
                  style={{ margin: '0 5px' }}
                  onClick={this.cancelDeclineImage}
                >
                  No
                </Button>
                <Button
                  variant="danger"
                  onClick={this.confirmDecline}
                  style={{ margin: '0 5px' }}
                >
                  Yes
                </Button>
              </div>
            </div>
          ) : (
            <div style={{ margin: '0 auto' }}>
              <Button
                variant="danger"
                onClick={this.declineImage}
                style={{ margin: '0 5px' }}
              >
                Decline
              </Button>
              <Button
                variant="primary"
                onClick={this.approveImage}
                style={{ margin: '0 5px' }}
              >
                Approve
              </Button>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(mapStoreToProps)(SubmittedImageModal);
