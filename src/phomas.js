const fs = require("fs");

// const exports = module.exports;

const IMAGE_FOLDER = "./phomas_images/";

exports.getImagesByID = filename => {
  return new Promise((res, rej) => {
    fs.readFile(IMAGE_FOLDER + filename, function(err, data) {
      if (err) {
        rej(err);
      }
      res(data);
    });
  });

  /*
   * USED FOR MULTIPLE IMAGES
   */
  // else {
  // return new Promise((res, rej) => {
  //   fs.readdir(IMAGE_FOLDER, (err, files) => {
  //     if (err) {
  //       rej(err);
  //     }
  //     if (files.length > 0) {
  //       const imageData = [];
  //       for (let i in files) {
  //         fs.readFile(IMAGE_FOLDER + files[i], (err, data) => {
  //           if (err) {
  //             rej(err);
  //           }
  //           if (data) {
  //             imageData.push(data);
  //           }
  //           // If last one return imagedata
  //           if (imageData.length === files.length) {
  //             res(imageData);
  //           }
  //         });
  //       }
  //     }
  //   });
  // });
  // }
};
