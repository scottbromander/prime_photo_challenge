import React, { Component } from 'react';

const imageContainerStyle = {
  // padding: '1%',
  height: '200px',
  border: '1px solid rgba(0,0,0,0.2)',
  textAlign: 'center',
  overflow: 'hidden',
  padding: '0',
};

const imageStyles = {
  width: '100%',
  overflow: 'hidden',
};

class ImageGallery extends Component {
  render() {
    const childElements = this.props.elements.map((element, index) => {
      return (
        <div
          key={index}
          style={imageContainerStyle}
          className="col-md-4 center"
          onClick={this.props.setItem(element)}
        >
          <img
            src={element.image_url}
            style={imageStyles}
            alt={'Photo of ' + element.description}
          />
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
