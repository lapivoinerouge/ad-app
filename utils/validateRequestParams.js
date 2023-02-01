const getImageFileType = require('./getImageFileType');

exports.validateStringParam = param => {
  return param !== null && typeof param === 'string' && param.length > 0;
}

exports.validateImage = async img => {
  let acceptedFileType = true;

  if (img) {
    const fileType = await getImageFileType(img);
    acceptedFileType = ['image/png', 'image/jpg', 'image/jpeg'].includes(fileType);
  }
  return acceptedFileType;
}