const { v4: uuidv4 } = require("uuid");
const uploadToBucket = require("../util/bucket");
const uploadProfile = require("../models/user");
const uploadProfileCompany = require("../models/company");
const base64ToBuffer = require("../util/functions").base64ToBuffer;

exports.uploadImage = (req, res, next) => {
  const userId = req.params.userId;
  const { buffer, extension } = base64ToBuffer(req.body.image);
  const userType = req.body.userType;
  const uniqueId = uuidv4(); // generate a unique identifier for the image
  uploadToBucket("licenta_image_files", buffer, uniqueId, extension)
    .then((_) => {
      // generate the public url at which you can find the image after storing in the bucket
      const imgUrl = `https://storage.googleapis.com/licenta_image_files/${uniqueId}.${extension}`;
      (userType === "company" ? uploadProfileCompany : uploadProfile).uploadImageProfile(imgUrl, userId).then((response) => {
        if (!response) {
          res.status(500).json({
            errorMesasge: `${userType} profile picture could not be updated!`,
          });
        } else {
          res.status(200).json({ successMessage: `${userType} profile picture updated!` });
        }
      });
      // launch the process of updating the image in all documents that it appears in
      (userType === "company" ? uploadProfileCompany : uploadProfile).updateDuplicateProfile(imgUrl, userId);
    })
    .catch((_) => {
      res.status(500).json({ errorMesasge: `${userType} profile picture could not pe uploaded` });
    });
};
