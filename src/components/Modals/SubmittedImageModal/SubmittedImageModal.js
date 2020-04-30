import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import S3Uploader from '../../Subcomponents/S3Uploader';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class SubmittedImageModal extends Component {
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
            <h2>SUBMITTED IMAGE:</h2>
            {this.props.challenge && <p>{this.props.submission.description}</p>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ width: '250px', margin: '0 auto' }}>
            <img
              src={this.props.submission.imgUrl}
              alt={'Image of ' + this.props.submission.description}
              style={{ width: '250px' }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            disabled={!this.state.btnEnabled}
            onClick={this.submitImage}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(mapStoreToProps)(SubmittedImageModal);
