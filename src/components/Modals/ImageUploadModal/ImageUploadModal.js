import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import S3Uploader from '../../Subcomponents/S3Uploader';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class ImageUploadModal extends Component {
  state = {
    btnEnabled: false,
    imgUrl: null,
  };

  onSuccessfulLoad = () => {
    this.setState({
      btnEnabled: true,
    });
  };

  onImageCallback = (imgUrl) => {
    this.setState(
      {
        imgUrl,
      },
      () => {
        this.onSuccessfulLoad();
      }
    );
  };

  submitImage = (event) => {
    this.props.dispatch({
      type: 'POST_PHOTO',
      payload: {
        user: this.props.user.id,
        team: this.props.user.team,
        image_url: this.state.imgUrl,
        challenge_id: this.props.challenge.id,
      },
    });

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
            <h2>UPLOAD IMAGE:</h2>
            {this.props.challenge && <p>{this.props.challenge.description}</p>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <S3Uploader onImageCallback={this.onImageCallback} />
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

export default connect(mapStoreToProps)(ImageUploadModal);
