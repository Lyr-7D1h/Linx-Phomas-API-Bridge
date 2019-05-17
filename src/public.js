const fs = require("fs");

const PUBLIC_FOLDER = "./public_images/";

exports.writeImage = (filename, data) => {
  return new Promise((res, rej) => {
    fs.writeFile(PUBLIC_FOLDER + filename, data, err => {
      if (err) {
        console.error(err);
        rej(err);
      } else {
        res(PUBLIC_FOLDER + filename);
      }
    });
  });
};
