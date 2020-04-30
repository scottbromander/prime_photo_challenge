module.exports = () => {
  return require('react-dropzone-s3-uploader/s3router')({
    bucket: 'primephotochallenge',
    region: 'us-east-2',
    headers: { 'Access-Control-Allow-Origin': '*' },
    ACL: 'public-read',
  });
};
