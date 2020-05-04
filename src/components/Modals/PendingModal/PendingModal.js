import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import S3Uploader from '../../Subcomponents/S3Uploader';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class ImageUploadModal extends Component {
  submitImage = (event) => {
    this.props.closeModal();
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.toggleModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p class="lead">Image is pending approval</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Hi</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            disabled={!this.state.btnEnabled}
            onClick={this.submitImage}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(mapStoreToProps)(PendingModal);
