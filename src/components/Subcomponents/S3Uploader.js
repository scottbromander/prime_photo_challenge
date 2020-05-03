import React, { Component } from 'react';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

const dropZoneStyle = {
  margin: '0 auto',
  border: '1px dashed gray',
  width: '200px',
  height: '200px',
};

export default class S3Uploader extends Component {
  state = {
    imgUrl: null,
    loading: false,
  };

  handleFinishedUpload = (info) => {
    this.setState(
      {
        imgUrl: info.fileUrl,
        loading: false,
      },
      () => {
        this.props.onImageCallback(this.state.imgUrl);
      }
    );
  };

  render() {
    const uploadOptions = {
      server: 'https://murmuring-anchorage-62100.herokuapp.com',
      // server: 'http://localhost:5000',
    };
    const s3Url = 'https://primephotochallenge.s3.amazonaws.com';

    return (
      <div>
        {!this.state.imgUrl ? (
          <div>
            {' '}
            <p style={{ textAlign: 'center' }}>CLICK OF DRAG IMAGE HERE</p>
            <DropzoneS3Uploader
              onFinish={this.handleFinishedUpload}
              s3Url={s3Url}
              maxSize={1024 * 1024 * 5}
              upload={uploadOptions}
              style={dropZoneStyle}
            />
          </div>
        ) : (
          <div style={{ width: '250px', margin: '0 auto' }}>
            <img src={this.state.imgUrl} style={{ width: '250px' }} />
          </div>
        )}
      </div>
    );
  }
}
