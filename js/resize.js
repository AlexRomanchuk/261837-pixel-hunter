export const resize = (sizeImage, sizeFrame) => {
  const FIXED = 2;
  const proportion = (sizeImage.width / sizeImage.height).toFixed(FIXED);
  let imageWidth = 0;
  let imageHeight = 0;
  const resizeOnWidth = () => {
    imageHeight = sizeFrame.height;
    imageWidth = Math.trunc(imageHeight * proportion);
  };
  const resizeOnHeight = () => {
    imageWidth = sizeFrame.width;
    imageHeight = Math.trunc(imageWidth / proportion);
  };
  const checkSize = () => {
    if (imageHeight > sizeFrame.height) {
      resizeOnWidth();
    }
  };
  const resizeHeight = () => {
    resizeOnHeight();
    checkSize();
  };
  if (sizeFrame.height >= sizeFrame.width && sizeImage.height >= sizeImage.width) {
    resizeHeight();
  }
  if (sizeFrame.height >= sizeFrame.width && sizeImage.height <= sizeImage.width) {
    resizeOnHeight();
  }
  if (sizeFrame.height <= sizeFrame.width && sizeImage.height >= sizeImage.width) {
    resizeOnWidth();
  }
  if (sizeFrame.height <= sizeFrame.width && sizeImage.height <= sizeImage.width) {
    resizeHeight();
  }
  return {
    'width': imageWidth,
    'height': imageHeight
  };
};
