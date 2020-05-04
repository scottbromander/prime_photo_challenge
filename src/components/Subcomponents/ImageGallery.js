import React, { Component } from 'react';

const imageContainerStyle = {
  padding: '5%',
  border: '1px solid rgba(0,0,0,0.2)',
};

const imageStyles = {
  width: '100%',
};

class ImageGallery extends Component {
  render() {
    const childElements = this.props.elements.map((element, index) => {
      return (
        <div key={index} style={imageContainerStyle}>
          <img src={element.image_url} style={imageStyles} />
        </div>
      );
    });

    return <div>{childElements}</div>;
  }
}

export default ImageGallery;
