import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import S3Uploader from '../../Subcomponents/S3Uploader';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class SubmittedImageModal extends Component {
  approveImage = (event) => {
    console.log('Approve Image: ', this.props.item);
    this.props.dispatch({
      type: 'APPROVE_SUBMISSION',
      payload: this.props.item,
    });
    this.props.closeModal();
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
          <Button variant="primary" onClick={this.approveImage}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(mapStoreToProps)(SubmittedImageModal);
