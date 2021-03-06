import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class PendingModal extends Component {
  state = {
    confirmDelete: false,
  };

  okModal = (event) => {
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
    console.log(this.props);
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
            {this.props.challenge && (
              <img
                src={this.props.challenge.image_url}
                alt={
                  this.props.item &&
                  'Image of ' + this.props.challenge.description
                }
                style={{ width: '100%' }}
              />
            )}
          </div>
          <hr style={{ margin: '5px 0' }} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: '0' }}>
              {this.props.challenge && this.props.challenge.description}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ margin: '0 auto' }}>
            <Button
              variant="primary"
              onClick={this.okModal}
              style={{ margin: '0 5px' }}
            >
              OK
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(mapStoreToProps)(PendingModal);
