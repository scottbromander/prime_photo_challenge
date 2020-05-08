import React, { Component } from 'react';

const imageContainerStyle = {
  // padding: '1%',
  border: '1px solid rgba(0,0,0,0.2)',
  textAlign: 'center',
  overflow: 'auto',
  padding: '0',
};

const imageStyles = {
  height: '200px',
};

class ImageGallery extends Component {
  render() {
    const childElements = this.props.elements.map((element, index) => {
      return (
        <div
          key={index}
          style={imageContainerStyle}
          className="col-md-4 center"
        >
          <img src={element.image_url} style={imageStyles} />
        </div>
      );
    });

    return (
      <div>
        <div className="row">{childElements}</div>
      </div>
    );
  }
}

export default ImageGallery;
